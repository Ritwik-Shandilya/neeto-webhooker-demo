import { useState } from 'react'
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
      <textarea
        value={payload}
        onChange={e => setPayload(e.target.value)}
      />
      <button onClick={handleSend} disabled={!sessionUuid}>Send</button>
      {result && <pre>{result}</pre>}
    </div>
  )
}
