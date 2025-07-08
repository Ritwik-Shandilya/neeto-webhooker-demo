import { useEffect, useState } from 'react'
import { fetchEvents } from '../api'

export interface EventRecord {
  id: number
  method: string
  received_at: string
}

interface Props {
  sessionUuid: string
  onSelect: (event: EventRecord) => void
  refreshKey: number
}

export default function EventList({ sessionUuid, onSelect, refreshKey }: Props) {
  const [events, setEvents] = useState<EventRecord[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (!sessionUuid) return
    fetchEvents(sessionUuid)
      .then(setEvents)
      .catch(err => console.error(err))
  }, [sessionUuid, refreshKey])

  const filtered = events.filter(e =>
    e.method.toLowerCase().includes(search.toLowerCase()) ||
    e.id.toString().includes(search)
  )

  return (
    <div className="event-list">
      <input
        placeholder="Search"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ul>
        {filtered.map(event => (
          <li key={event.id} onClick={() => onSelect(event)}>
            <strong>{event.method}</strong> #{event.id}
            <br />
            <small>{new Date(event.received_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  )
}
