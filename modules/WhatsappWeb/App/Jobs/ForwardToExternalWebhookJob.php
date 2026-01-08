<?php

namespace Modules\WhatsappWeb\App\Jobs;

use App\Models\Platform;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ForwardToExternalWebhookJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $timeout = 30;
    public int $tries = 3;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public Platform $platform,
        public array $payload
    ) {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $webhookUrl = $this->platform->getMeta('webhook_callback_url');

        // Check if webhook URL is configured
        if (empty($webhookUrl)) {
            Log::debug('WhatsappWeb: No external webhook URL configured for platform: ' . $this->platform->uuid);
            return;
        }

        // Validate URL format
        if (!filter_var($webhookUrl, FILTER_VALIDATE_URL)) {
            Log::warning('WhatsappWeb: Invalid webhook URL format for platform: ' . $this->platform->uuid);
            return;
        }

        try {
            // Prepare webhook payload
            $webhookPayload = [
                'platform_id' => $this->platform->id,
                'platform_uuid' => $this->platform->uuid,
                'platform_name' => $this->platform->name,
                'phone_number' => $this->platform->getMeta('phone_number'),
                'event' => $this->payload['event'] ?? 'messages.upsert',
                'timestamp' => now()->toIso8601String(),
                'data' => $this->payload['data'] ?? [],
            ];

            // Send HTTP POST request to external webhook
            $response = Http::timeout(30)
                ->retry(2, 100) // Retry 2 times with 100ms delay
                ->post($webhookUrl, $webhookPayload);

            // Log the response
            if ($response->successful()) {
                Log::info('WhatsappWeb: Successfully forwarded message to external webhook', [
                    'platform_uuid' => $this->platform->uuid,
                    'webhook_url' => $webhookUrl,
                    'status_code' => $response->status(),
                ]);
            } else {
                Log::warning('WhatsappWeb: External webhook returned error', [
                    'platform_uuid' => $this->platform->uuid,
                    'webhook_url' => $webhookUrl,
                    'status_code' => $response->status(),
                    'response_body' => $response->body(),
                ]);
            }

        } catch (\Exception $e) {
            Log::error('WhatsappWeb: Failed to forward message to external webhook', [
                'platform_uuid' => $this->platform->uuid,
                'webhook_url' => $webhookUrl,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            // Re-throw exception to trigger retry mechanism
            throw $e;
        }
    }

    /**
     * Handle a job failure.
     */
    public function failed(\Throwable $exception): void
    {
        Log::error('WhatsappWeb: External webhook job failed after all retries', [
            'platform_uuid' => $this->platform->uuid,
            'error' => $exception->getMessage(),
        ]);
    }
}
