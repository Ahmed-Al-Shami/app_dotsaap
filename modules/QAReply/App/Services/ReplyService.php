<?php

namespace Modules\QAReply\App\Services;

use App\Abstracts\ReplyServiceAbstract;
use Modules\QAReply\App\Models\QaReply;

class ReplyService extends ReplyServiceAbstract
{
    public function process(): static
    {
        /**
         * @var \Modules\QAReply\App\Models\QaReply
         */
        $autoResponse = QaReply::find($this->datasetId);

        if (! $autoResponse) {
            logOnDebug('Auto reply not found');

            return $this;
        }

        $bestMatchItem = $autoResponse->items()
            ->whereFullText(
                'key',
                $this->messageText
            )
            ->first();

        if (! $bestMatchItem) {
            logOnDebug('Best match item not found');

            return $this;
        }

        $messageType = $bestMatchItem->type;
        $messageBody = null;

        $messageBody = match ($messageType) {
            'text' => [
                'text' => $bestMatchItem->value,
            ],
            'template' => (array) $bestMatchItem->template()->value('meta'),
            default => []
        };

        if ($messageType == 'template') {
            $messageType = $bestMatchItem->template()->value('type');
        }

        $this->addMessage($messageType, $messageBody);

        return $this;
    }
}
