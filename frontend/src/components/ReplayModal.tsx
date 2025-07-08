import { useState } from 'react'
import { Input, Button, Modal } from '@bigbinary/neetoui'
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
    <Modal isOpen onClose={onClose} size="small" closeButton={false}>
      <h3>Replay Event {eventId}</h3>
      <Input
        placeholder="Target URL"
        value={url}
        onChange={e => setUrl(e.target.value)}
        unlimitedChars
        className="mb-3"
      />
      <div className="neeto-ui-flex neeto-ui-gap-2 neeto-ui-justify-end">
        <Button label="Send" style="primary" onClick={handleSubmit} />
        <Button label="Close" style="secondary" onClick={onClose} />
      </div>
      {result && <p>{result}</p>}
    </Modal>
  )
}
