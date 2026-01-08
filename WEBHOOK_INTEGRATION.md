# WhatsApp Web External Webhook Integration

## Overview
This feature allows you to forward all incoming WhatsApp messages to an external webhook URL in real-time. This is useful for integrating WhatsApp with your own systems, CRM, or third-party applications.

## Setup

### 1. Configure Webhook URL
1. Go to **Platforms** page
2. Click on **Settings** icon for your WhatsApp Web platform
3. Scroll down to find **External Webhook URL** field
4. Enter your webhook URL (e.g., `https://your-domain.com/webhook`)
5. Click **Submit** to save

### 2. Webhook Payload Structure

When a message is received, the system will send a POST request to your webhook URL with the following JSON payload:

```json
{
  "platform_id": 123,
  "platform_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "platform_name": "My WhatsApp Device",
  "phone_number": "+1234567890",
  "event": "messages.upsert",
  "timestamp": "2026-01-08T10:30:45+00:00",
  "data": {
    "messages": [
      {
        "key": {
          "remoteJid": "1234567890@s.whatsapp.net",
          "fromMe": false,
          "id": "3EB0C2F2F0C4D2E5D6F7"
        },
        "messageTimestamp": "1704710445",
        "message": {
          "conversation": "Hello, this is a test message"
        },
        "pushName": "John Doe"
      }
    ]
  }
}
```

### 3. Payload Fields Description

| Field | Type | Description |
|-------|------|-------------|
| `platform_id` | integer | Internal platform ID |
| `platform_uuid` | string | Unique platform identifier |
| `platform_name` | string | Name of the WhatsApp platform |
| `phone_number` | string | Phone number associated with the platform |
| `event` | string | Event type (e.g., "messages.upsert") |
| `timestamp` | string | ISO 8601 timestamp when webhook was triggered |
| `data` | object | Message data from WhatsApp |

### 4. Message Data Structure

The `data.messages` array contains message objects with the following structure:

#### Key Fields
- `key.remoteJid`: Sender's WhatsApp ID (format: `number@s.whatsapp.net`)
- `key.fromMe`: Boolean indicating if message is from you (false = incoming)
- `key.id`: Unique message ID

#### Message Types
The system supports various message types:

**Text Message:**
```json
{
  "message": {
    "conversation": "Message text here"
  }
}
```

**Image Message:**
```json
{
  "message": {
    "imageMessage": {
      "caption": "Image caption",
      "mimetype": "image/jpeg",
      "url": "..."
    }
  }
}
```

**Audio Message:**
```json
{
  "message": {
    "audioMessage": {
      "mimetype": "audio/ogg; codecs=opus",
      "url": "..."
    }
  }
}
```

**Video Message:**
```json
{
  "message": {
    "videoMessage": {
      "caption": "Video caption",
      "mimetype": "video/mp4",
      "url": "..."
    }
  }
}
```

**Document Message:**
```json
{
  "message": {
    "documentMessage": {
      "fileName": "document.pdf",
      "mimetype": "application/pdf",
      "url": "..."
    }
  }
}
```

## Webhook Endpoint Requirements

Your webhook endpoint should:

1. **Accept POST requests** with JSON payload
2. **Respond within 30 seconds** to avoid timeout
3. **Return HTTP 2xx status code** to indicate success
4. **Handle retries**: The system will retry up to 3 times if your endpoint fails

### Example Webhook Handler (PHP)

```php
<?php
// webhook-handler.php

// Get the raw POST data
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Verify webhook data
if (!$data || !isset($data['platform_uuid'])) {
    http_response_code(400);
    die('Invalid payload');
}

// Extract message information
$platformUuid = $data['platform_uuid'];
$event = $data['event'];
$messages = $data['data']['messages'] ?? [];

foreach ($messages as $message) {
    $from = $message['key']['remoteJid'];
    $fromMe = $message['key']['fromMe'];
    
    // Only process incoming messages
    if (!$fromMe) {
        $text = $message['message']['conversation'] ?? '';
        $pushName = $message['pushName'] ?? 'Unknown';
        
        // Your logic here
        // e.g., save to database, send notification, etc.
        error_log("New message from {$pushName} ({$from}): {$text}");
    }
}

// Return success response
http_response_code(200);
echo json_encode(['success' => true]);
```

### Example Webhook Handler (Node.js)

```javascript
// webhook-handler.js
const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhook', (req, res) => {
    const { platform_uuid, event, data } = req.body;
    
    if (!platform_uuid) {
        return res.status(400).json({ error: 'Invalid payload' });
    }
    
    const messages = data.messages || [];
    
    messages.forEach(message => {
        const from = message.key.remoteJid;
        const fromMe = message.key.fromMe;
        
        // Only process incoming messages
        if (!fromMe) {
            const text = message.message?.conversation || '';
            const pushName = message.pushName || 'Unknown';
            
            // Your logic here
            console.log(`New message from ${pushName} (${from}): ${text}`);
        }
    });
    
    res.status(200).json({ success: true });
});

app.listen(3000, () => {
    console.log('Webhook server listening on port 3000');
});
```

### Example Webhook Handler (Python)

```python
# webhook_handler.py
from flask import Flask, request, jsonify
import logging

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)

@app.route('/webhook', methods=['POST'])
def webhook():
    data = request.get_json()
    
    if not data or 'platform_uuid' not in data:
        return jsonify({'error': 'Invalid payload'}), 400
    
    platform_uuid = data['platform_uuid']
    event = data['event']
    messages = data.get('data', {}).get('messages', [])
    
    for message in messages:
        from_jid = message['key']['remoteJid']
        from_me = message['key']['fromMe']
        
        # Only process incoming messages
        if not from_me:
            text = message.get('message', {}).get('conversation', '')
            push_name = message.get('pushName', 'Unknown')
            
            # Your logic here
            logging.info(f"New message from {push_name} ({from_jid}): {text}")
    
    return jsonify({'success': True}), 200

if __name__ == '__main__':
    app.run(port=3000)
```

## Security Recommendations

1. **Use HTTPS**: Always use HTTPS for your webhook URL to ensure data encryption
2. **Validate Origin**: Check the payload structure to ensure it's coming from the expected source
3. **IP Whitelisting**: Consider whitelisting the server IP if possible
4. **Rate Limiting**: Implement rate limiting on your webhook endpoint
5. **Authentication**: Consider adding a secret token in your webhook URL for validation

## Troubleshooting

### Webhook Not Receiving Messages

1. **Check URL**: Ensure the webhook URL is correct and accessible from the internet
2. **Check Logs**: Check application logs at `storage/logs/laravel.log` for webhook errors
3. **Test Endpoint**: Use tools like Postman or curl to test your webhook endpoint
4. **Check Firewall**: Ensure your firewall allows incoming connections from the server

### Example Log Entry

Successful webhook delivery:
```
[2026-01-08 10:30:45] local.INFO: WhatsappWeb: Successfully forwarded message to external webhook {"platform_uuid":"550e8400-e29b-41d4-a716-446655440000","webhook_url":"https://your-domain.com/webhook","status_code":200}
```

Failed webhook delivery:
```
[2026-01-08 10:30:45] local.ERROR: WhatsappWeb: Failed to forward message to external webhook {"platform_uuid":"550e8400-e29b-41d4-a716-446655440000","webhook_url":"https://your-domain.com/webhook","error":"Connection timeout"}
```

## Testing Your Webhook

You can test your webhook using services like:
- [Webhook.site](https://webhook.site) - Get a temporary webhook URL for testing
- [RequestBin](https://requestbin.com) - Inspect HTTP requests
- [ngrok](https://ngrok.com) - Expose your local server to the internet

## Additional Features

- **Automatic Retries**: Failed webhook deliveries are automatically retried up to 3 times
- **Async Processing**: Webhook forwarding is processed in background jobs to avoid delays
- **Comprehensive Logging**: All webhook activities are logged for debugging

## Support

For issues or questions, please check the application logs or contact support.
