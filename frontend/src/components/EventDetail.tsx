import type { EventRecord } from './EventList'

interface Props {
  event: EventDetail | null
}

export interface EventDetail extends EventRecord {
  headers?: Record<string, string>
  body?: string
  ip_address?: string
}

export default function EventDetail({ event }: Props) {
  if (!event) return <div className="event-detail">Select an event</div>

  return (
    <div className="event-detail">
      <h2>Event #{event.id}</h2>
      <p><strong>Method:</strong> {event.method}</p>
      {event.ip_address && <p><strong>IP:</strong> {event.ip_address}</p>}
      {event.body && <pre>{event.body}</pre>}
      {event.headers && (
        <>
          <h3>Headers</h3>
          <pre>{JSON.stringify(event.headers, null, 2)}</pre>
        </>
      )}
    </div>
  )
}
