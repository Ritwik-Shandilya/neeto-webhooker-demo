import { useState } from 'react'
import EventList, { type EventRecord } from './components/EventList'
import EventDetail from './components/EventDetail'
import ReplayModal from './components/ReplayModal'
import WebhookSender from './components/WebhookSender'
import './App.css'

function App() {
  const [sessionUuid, setSessionUuid] = useState('')
  const [selected, setSelected] = useState<EventRecord | null>(null)
  const [replayFor, setReplayFor] = useState<EventRecord | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div className="app-container">
      <header>
        <input
          placeholder="Session UUID"
          value={sessionUuid}
          onChange={e => setSessionUuid(e.target.value)}
        />
      </header>
      <div className="panes">
        <EventList
          sessionUuid={sessionUuid}
          onSelect={e => setSelected(e)}
          refreshKey={refreshKey}
        />
        <div className="detail-wrapper">
          <WebhookSender
            sessionUuid={sessionUuid}
            onSent={() => setRefreshKey(r => r + 1)}
          />
          <EventDetail event={selected} />
          {selected && (
            <button onClick={() => setReplayFor(selected)}>Replay</button>
          )}
        </div>
      </div>
      {replayFor && (
        <ReplayModal eventId={replayFor.id} onClose={() => setReplayFor(null)} />
      )}
    </div>
  )
}

export default App
