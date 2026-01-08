# دليل دمج Webhook الخارجي لواتساب ويب

## نظرة عامة
تتيح لك هذه الميزة إعادة توجيه جميع رسائل واتساب الواردة إلى رابط webhook خارجي في الوقت الفعلي. هذا مفيد لدمج واتساب مع أنظمتك الخاصة أو CRM أو تطبيقات الطرف الثالث.

## الإعداد

### 1. تكوين رابط Webhook
1. اذهب إلى صفحة **المنصات (Platforms)**
2. انقر على أيقونة **الإعدادات (Settings)** للمنصة الخاصة بك
3. مرر لأسفل للعثور على حقل **External Webhook URL**
4. أدخل رابط الـ webhook الخاص بك (مثال: `https://your-domain.com/webhook`)
5. انقر على **حفظ (Submit)** للحفظ

### 2. هيكل البيانات المُرسلة

عند استقبال رسالة، سيرسل النظام طلب POST إلى رابط الـ webhook الخاص بك مع البيانات التالية بصيغة JSON:

```json
{
  "platform_id": 123,
  "platform_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "platform_name": "جهاز واتساب الخاص بي",
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
          "conversation": "مرحباً، هذه رسالة تجريبية"
        },
        "pushName": "أحمد محمد"
      }
    ]
  }
}
```

### 3. وصف الحقول

| الحقل | النوع | الوصف |
|-------|------|-------------|
| `platform_id` | رقم | معرف المنصة الداخلي |
| `platform_uuid` | نص | المعرف الفريد للمنصة |
| `platform_name` | نص | اسم منصة واتساب |
| `phone_number` | نص | رقم الهاتف المرتبط بالمنصة |
| `event` | نص | نوع الحدث (مثال: "messages.upsert") |
| `timestamp` | نص | الطابع الزمني بصيغة ISO 8601 |
| `data` | كائن | بيانات الرسالة من واتساب |

### 4. هيكل بيانات الرسالة

يحتوي مصفوفة `data.messages` على كائنات الرسائل بالهيكل التالي:

#### الحقول الرئيسية
- `key.remoteJid`: معرف واتساب للمرسل (صيغة: `number@s.whatsapp.net`)
- `key.fromMe`: قيمة منطقية تشير إذا كانت الرسالة منك (false = رسالة واردة)
- `key.id`: معرف فريد للرسالة

#### أنواع الرسائل

**رسالة نصية:**
```json
{
  "message": {
    "conversation": "نص الرسالة هنا"
  }
}
```

**رسالة صورة:**
```json
{
  "message": {
    "imageMessage": {
      "caption": "تعليق الصورة",
      "mimetype": "image/jpeg",
      "url": "..."
    }
  }
}
```

**رسالة صوتية:**
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

**رسالة فيديو:**
```json
{
  "message": {
    "videoMessage": {
      "caption": "تعليق الفيديو",
      "mimetype": "video/mp4",
      "url": "..."
    }
  }
}
```

**رسالة مستند:**
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

## متطلبات نقطة نهاية Webhook

يجب أن تكون نقطة النهاية الخاصة بك:

1. **تقبل طلبات POST** مع بيانات JSON
2. **تستجيب خلال 30 ثانية** لتجنب انتهاء المهلة
3. **تُرجع رمز حالة HTTP 2xx** للإشارة إلى النجاح
4. **تتعامل مع إعادة المحاولات**: سيُعيد النظام المحاولة حتى 3 مرات في حالة الفشل

### مثال معالج Webhook (PHP)

```php
<?php
// webhook-handler.php

// الحصول على البيانات الخام
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// التحقق من بيانات الـ webhook
if (!$data || !isset($data['platform_uuid'])) {
    http_response_code(400);
    die('بيانات غير صالحة');
}

// استخراج معلومات الرسالة
$platformUuid = $data['platform_uuid'];
$event = $data['event'];
$messages = $data['data']['messages'] ?? [];

foreach ($messages as $message) {
    $from = $message['key']['remoteJid'];
    $fromMe = $message['key']['fromMe'];
    
    // معالجة الرسائل الواردة فقط
    if (!$fromMe) {
        $text = $message['message']['conversation'] ?? '';
        $pushName = $message['pushName'] ?? 'غير معروف';
        
        // منطقك هنا
        // مثال: حفظ في قاعدة البيانات، إرسال إشعار، إلخ.
        error_log("رسالة جديدة من {$pushName} ({$from}): {$text}");
    }
}

// إرجاع استجابة نجاح
http_response_code(200);
echo json_encode(['success' => true]);
```

### مثال معالج Webhook (Node.js)

```javascript
// webhook-handler.js
const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhook', (req, res) => {
    const { platform_uuid, event, data } = req.body;
    
    if (!platform_uuid) {
        return res.status(400).json({ error: 'بيانات غير صالحة' });
    }
    
    const messages = data.messages || [];
    
    messages.forEach(message => {
        const from = message.key.remoteJid;
        const fromMe = message.key.fromMe;
        
        // معالجة الرسائل الواردة فقط
        if (!fromMe) {
            const text = message.message?.conversation || '';
            const pushName = message.pushName || 'غير معروف';
            
            // منطقك هنا
            console.log(`رسالة جديدة من ${pushName} (${from}): ${text}`);
        }
    });
    
    res.status(200).json({ success: true });
});

app.listen(3000, () => {
    console.log('خادم Webhook يعمل على المنفذ 3000');
});
```

### مثال معالج Webhook (Python)

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
        return jsonify({'error': 'بيانات غير صالحة'}), 400
    
    platform_uuid = data['platform_uuid']
    event = data['event']
    messages = data.get('data', {}).get('messages', [])
    
    for message in messages:
        from_jid = message['key']['remoteJid']
        from_me = message['key']['fromMe']
        
        # معالجة الرسائل الواردة فقط
        if not from_me:
            text = message.get('message', {}).get('conversation', '')
            push_name = message.get('pushName', 'غير معروف')
            
            # منطقك هنا
            logging.info(f"رسالة جديدة من {push_name} ({from_jid}): {text}")
    
    return jsonify({'success': True}), 200

if __name__ == '__main__':
    app.run(port=3000)
```

## توصيات الأمان

1. **استخدم HTTPS**: استخدم دائماً HTTPS لرابط الـ webhook لضمان تشفير البيانات
2. **التحقق من المصدر**: تحقق من هيكل البيانات للتأكد من أنها قادمة من المصدر المتوقع
3. **قائمة بيضاء للـ IP**: فكر في إضافة IP الخادم إلى القائمة البيضاء إن أمكن
4. **تحديد المعدل**: قم بتطبيق تحديد معدل الطلبات على نقطة نهاية الـ webhook
5. **المصادقة**: فكر في إضافة رمز سري في رابط الـ webhook للتحقق

## استكشاف الأخطاء وإصلاحها

### الـ Webhook لا يستقبل رسائل

1. **تحقق من الرابط**: تأكد من أن رابط الـ webhook صحيح ويمكن الوصول إليه من الإنترنت
2. **تحقق من السجلات**: تحقق من سجلات التطبيق في `storage/logs/laravel.log`
3. **اختبر نقطة النهاية**: استخدم أدوات مثل Postman أو curl لاختبار نقطة النهاية
4. **تحقق من جدار الحماية**: تأكد من أن جدار الحماية يسمح بالاتصالات الواردة من الخادم

### مثال على سجل الأحداث

توصيل webhook ناجح:
```
[2026-01-08 10:30:45] local.INFO: WhatsappWeb: Successfully forwarded message to external webhook {"platform_uuid":"550e8400-e29b-41d4-a716-446655440000","webhook_url":"https://your-domain.com/webhook","status_code":200}
```

فشل توصيل webhook:
```
[2026-01-08 10:30:45] local.ERROR: WhatsappWeb: Failed to forward message to external webhook {"platform_uuid":"550e8400-e29b-41d4-a716-446655440000","webhook_url":"https://your-domain.com/webhook","error":"Connection timeout"}
```

## اختبار الـ Webhook

يمكنك اختبار الـ webhook الخاص بك باستخدام خدمات مثل:
- [Webhook.site](https://webhook.site) - احصل على رابط webhook مؤقت للاختبار
- [RequestBin](https://requestbin.com) - فحص طلبات HTTP
- [ngrok](https://ngrok.com) - اعرض خادمك المحلي على الإنترنت

## ميزات إضافية

- **إعادة المحاولة التلقائية**: يتم إعادة محاولة التوصيلات الفاشلة تلقائياً حتى 3 مرات
- **معالجة غير متزامنة**: تتم معالجة إعادة توجيه الـ webhook في الخلفية لتجنب التأخير
- **تسجيل شامل**: يتم تسجيل جميع أنشطة الـ webhook لأغراض التصحيح

## الدعم

للمشاكل أو الأسئلة، يرجى التحقق من سجلات التطبيق أو الاتصال بالدعم.
