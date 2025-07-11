export async function fetchEvents(sessionUuid: string) {
  const res = await fetch(`http://localhost:3000/events/${sessionUuid}`);
  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
}

export async function replayEvent(eventId: number, url: string) {
  const res = await fetch(`http://localhost:3000/events/${eventId}/replay`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ url }),
  });
  return res.json();
}

export async function sendTestWebhook(sessionUuid: string, payload: string) {
  const res = await fetch(`http://localhost:3000/webhooks/${sessionUuid}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
  });
  return { status: res.status, body: await res.text() };
}
