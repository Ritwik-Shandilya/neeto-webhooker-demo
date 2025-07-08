import { useState } from 'react'
import { Textarea, Button } from '@bigbinary/neetoui'
import { sendTestWebhook } from '../api'

interface Props {
  sessionUuid: string
  onSent: () => void
}

export default function WebhookSender({ sessionUuid, onSent }: Props) {
  const [payload, setPayload] = useState('{"ping": true}')
  const [result, setResult] = useState<string | null>(null)

  const handleSend = async () => {
    const res = await sendTestWebhook(sessionUuid, payload)
    setResult(`Status: ${res.status}\n${res.body}`)
    onSent()
  }

  return (
    <div className="webhook-sender">
      <h3>Send Test Webhook</h3>
      <Textarea
        value={payload}
        onChange={e => setPayload(e.target.value)}
        rows={4}
        unlimitedChars
      />
      <Button
        label="Send"
        style="primary"
        disabled={!sessionUuid}
        onClick={handleSend}
        className="mt-2"
      />
      {result && <pre>{result}</pre>}
    </div>
  )
}
