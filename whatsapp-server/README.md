# WhatsApp Server - Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd whatsapp-server
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` file and configure according to your needs:

```bash
# Required Settings
HOST=localhost
PORT=8000
STORE_TYPE=memory
BASE_URL=http://localhost
APP_WEBHOOK_ALLOWED_EVENTS=ALL

# Optional: Change site key for security
SITE_KEY=your-unique-site-key
```

### 3. Database Setup (Optional)

If you want to use database storage instead of memory:

1. Set `STORE_TYPE=database` in `.env`
2. Configure `DATABASE_URL`:
   ```bash
   DATABASE_URL="mysql://username:password@localhost:3306/database_name"
   ```
3. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```

### 4. Start Server
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

## 📝 Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `HOST` | Server host | `localhost` | No |
| `PORT` | Server port | `8000` | No |
| `STORE_TYPE` | Storage type (`memory` or `database`) | `memory` | Yes |
| `DATABASE_URL` | Database connection string | - | If STORE_TYPE=database |
| `MAX_RETRIES` | Max reconnection attempts | `5` | No |
| `RECONNECT_INTERVAL` | Reconnection delay (ms) | `5000` | No |
| `BASE_URL` | Base URL for webhooks | `http://localhost` | Yes |
| `APP_WEBHOOK_ALLOWED_EVENTS` | Allowed webhook events | `ALL` | Yes |
| `APP_WEBHOOK_FILE_IN_BASE64` | Send files as base64 | `false` | No |
| `SITE_KEY` | Authentication site key | - | Yes |

## 🔧 Storage Types

### Memory Storage (Default)
- **Pros**: Fast, no database required
- **Cons**: Data lost on server restart
- **Use case**: Development, testing, small deployments

### Database Storage
- **Pros**: Persistent storage, survives restarts
- **Cons**: Requires database setup, slightly slower
- **Use case**: Production, large deployments

## 🎯 Webhook Events

You can control which events trigger webhooks using `APP_WEBHOOK_ALLOWED_EVENTS`:

### All Events
```bash
APP_WEBHOOK_ALLOWED_EVENTS=ALL
```

### Specific Events
```bash
APP_WEBHOOK_ALLOWED_EVENTS=CONNECTION_UPDATE,MESSAGES_UPSERT,MESSAGES_UPDATE
```

### Available Events:
- `CONNECTION_UPDATE` - Connection status changes
- `MESSAGES_UPSERT` - New messages received
- `MESSAGES_UPDATE` - Message status updates
- `MESSAGES_DELETE` - Messages deleted
- `MESSAGES_REACTION` - Message reactions
- `MESSAGES_RECEIPT_UPDATE` - Read receipts
- `MESSAGES_MEDIA_UPDATE` - Media message updates
- `CHATS_UPSERT` - New chats created
- `CHATS_UPDATE` - Chat updates
- `CHATS_DELETE` - Chats deleted
- `CHATS_SET` - Chats set/initialized
- `CONTACTS_UPSERT` - New contacts added
- `CONTACTS_UPDATE` - Contact updates
- `CONTACTS_SET` - Contacts set/initialized
- `PRESENCE_UPDATE` - User presence/status changes
- `GROUPS_UPSERT` - New groups created
- `GROUPS_UPDATE` - Group updates
- `GROUP_PARTICIPANTS_UPDATE` - Group participant changes
- `MESSAGING_HISTORY_SET` - Message history sync
- `LABELS_EDIT` - Label edits
- `LABELS_ASSOCIATION` - Label associations
- `BLOCKLIST_SET` - Blocklist initialization
- `BLOCKLIST_UPDATE` - Blocklist updates

## 🔒 Security

1. **Change SITE_KEY**: Always change the default `SITE_KEY` in production
2. **Use HTTPS**: Configure `BASE_URL` with HTTPS in production
3. **Firewall**: Restrict access to the server port

## 🐛 Troubleshooting

### Server won't start
1. Check if port is already in use:
   ```bash
   lsof -i :8000
   ```
2. Verify `.env` file exists and is configured correctly
3. Check Node.js version (requires Node.js 16+)

### Database connection errors
1. Verify `DATABASE_URL` is correct
2. Ensure database exists
3. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```

### Webhook not working
1. Verify `APP_WEBHOOK_ALLOWED_EVENTS` includes the event you're listening for
2. Check `BASE_URL` is accessible from the server
3. Review server logs for errors

## 📚 Additional Resources

- [Baileys Documentation](https://github.com/WhiskeySockets/Baileys)
- [Project Main Documentation](../README.md)
- [Webhook Integration Guide](../WEBHOOK_INTEGRATION.md)

## 🆘 Support

For issues or questions:
1. Check server logs in `logs/` directory
2. Review error messages carefully
3. Ensure all environment variables are set correctly
