# WhatsApp Web External Webhook Feature

## ✨ الميزة الجديدة | New Feature

تم إضافة إمكانية توجيه الرسائل الواردة من واتساب ويب إلى webhook خارجي لكل جهاز (منصة).

Added the ability to forward incoming WhatsApp Web messages to an external webhook for each device (platform).

---

## 📁 الملفات المُضافة | Added Files

### 1. Job للتوجيه | Forwarding Job
**Path:** `modules/WhatsappWeb/App/Jobs/ForwardToExternalWebhookJob.php`

وظيفة خلفية (Job) تتولى إرسال الرسائل الواردة إلى الـ webhook الخارجي:
- ✅ معالجة غير متزامنة (Async processing)
- ✅ إعادة محاولة تلقائية (3 مرات) | Auto-retry (3 times)
- ✅ Timeout 30 ثانية
- ✅ تسجيل شامل للأحداث | Comprehensive logging

### 2. التوثيق | Documentation
- **English:** `WEBHOOK_INTEGRATION.md`
- **العربية:** `WEBHOOK_INTEGRATION_AR.md`

توثيق كامل يشرح:
- كيفية الإعداد | Setup guide
- هيكل البيانات المُرسلة | Payload structure
- أمثلة برمجية (PHP, Node.js, Python)
- استكشاف الأخطاء | Troubleshooting

---

## 🔧 الملفات المُعدّلة | Modified Files

### 1. WebhookHandlerService
**Path:** `modules/WhatsappWeb/App/Services/WebhookHandlerService.php`

**التعديلات:**
- إضافة استيراد `ForwardToExternalWebhookJob`
- إضافة دالة `forwardToExternalWebhook()`
- استدعاء التوجيه عند استقبال رسالة جديدة في `messagesUpsert()`

### 2. PlatformSettingModal (Vue Component)
**Path:** `resources/js/Components/User/Platforms/PlatformSettingModal.vue`

**التعديلات:**
- إضافة حقل `webhook_callback_url` في النموذج
- إضافة مراقب (watcher) لتحميل القيمة من الـ meta
- إضافة حقل إدخال URL في واجهة المستخدم

### 3. PlatformConfigRequest (Validation)
**Path:** `app/Http/Requests/PlatformConfigRequest.php`

**التعديلات:**
- إضافة قاعدة تحقق للحقل `webhook_callback_url`
- التحقق: اختياري، URL صالح، بحد أقصى 500 حرف

### 4. اللغات | Language Files
**Path:** `lang/default.json`

**التعديلات:**
- إضافة مفتاح "External Webhook URL"
- إضافة مفتاح "Forward incoming messages to this external webhook URL (optional)"

---

## 🚀 كيفية الاستخدام | How to Use

### للمستخدم | For Users

1. **افتح إعدادات الجهاز | Open Platform Settings**
   - اذهب إلى صفحة المنصات
   - اضغط على أيقونة الإعدادات للجهاز

2. **أدخل رابط الـ Webhook**
   - املأ حقل "External Webhook URL"
   - مثال: `https://your-domain.com/webhook`

3. **احفظ | Save**
   - اضغط Submit

4. **اختبر | Test**
   - أرسل رسالة إلى رقم واتساب الخاص بك
   - ستستقبل البيانات على الـ webhook الخاص بك

### للمطورين | For Developers

راجع ملفات التوثيق للحصول على أمثلة برمجية كاملة:
- 📄 `WEBHOOK_INTEGRATION.md` (English)
- 📄 `WEBHOOK_INTEGRATION_AR.md` (العربية)

---

## 📊 هيكل البيانات المُرسلة | Webhook Payload

```json
{
  "platform_id": 123,
  "platform_uuid": "uuid-here",
  "platform_name": "Device Name",
  "phone_number": "+1234567890",
  "event": "messages.upsert",
  "timestamp": "2026-01-08T10:30:45+00:00",
  "data": {
    "messages": [...]
  }
}
```

---

## 🔒 الأمان | Security

- ✅ HTTPS مُوصى به | HTTPS Recommended
- ✅ التحقق من البيانات | Data Validation
- ✅ Timeout Protection
- ✅ Rate Limiting (يُفضل من جانبك | recommended on your side)

---

## 📝 ملاحظات | Notes

1. **الحقل اختياري** | Field is optional
   - إذا لم تُدخل URL، لن يتم التوجيه
   - If no URL provided, no forwarding occurs

2. **معالجة غير متزامنة** | Async Processing
   - لا يؤثر على سرعة استقبال الرسائل
   - Doesn't affect message receiving speed

3. **إعادة المحاولة** | Retry Mechanism
   - 3 محاولات في حالة الفشل
   - 3 attempts on failure

4. **التسجيل** | Logging
   - جميع الأحداث مُسجلة في `storage/logs/laravel.log`
   - All events logged to `storage/logs/laravel.log`

---

## 🧪 الاختبار | Testing

استخدم هذه الأدوات للاختبار:
- [Webhook.site](https://webhook.site)
- [RequestBin](https://requestbin.com)
- [ngrok](https://ngrok.com) للخوادم المحلية

---

## 📞 الدعم | Support

للحصول على المساعدة، راجع:
- ملفات التوثيق الكاملة
- سجلات التطبيق
- أو اتصل بالدعم الفني

---

**تاريخ الإضافة | Date Added:** 2026-01-08  
**الإصدار | Version:** 1.0.0
