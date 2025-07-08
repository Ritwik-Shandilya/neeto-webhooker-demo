import { useState } from 'react'
import { replayEvent } from '../api'

interface Props {
  eventId: number
  onClose: () => void
}

export default function ReplayModal({ eventId, onClose }: Props) {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<string | null>(null)

  const handleSubmit = async () => {
    const res = await replayEvent(eventId, url)
    if (res.error) setResult(`Error: ${res.error}`)
    else setResult(`Status: ${res.status}`)
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Replay Event {eventId}</h3>
        <input
          placeholder="Target URL"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <button onClick={handleSubmit}>Send</button>
        <button onClick={onClose}>Close</button>
        {result && <p>{result}</p>}
      </div>
    </div>
  )
}
