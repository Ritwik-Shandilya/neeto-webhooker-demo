# Webhooker API Documentation

This document describes the HTTP endpoints exposed by the Webhooker backend. All endpoints return JSON.

## 1. Create a Session

`POST /sessions`

Create a new webhook session. Optionally provide a `name` parameter for a persistent session.

**Response**

```json
{ "uuid": "<session_uuid>", "expires_at": "<timestamp>" }
```

## 2. Receive Webhooks

`POST /webhooks/:uuid`

Log an incoming webhook request for the session identified by `:uuid`.

Example using `curl`:

```bash
curl -X POST http://localhost:3000/webhooks/test-uuid \
  -H "Content-Type: application/json" \
  -d '{"ping": true}'
```

**Response**

```json
{ "status": "received", "event_id": 1 }
```

## 3. List Events

`GET /events/:uuid`

Return all captured events for the given session.

```bash
curl http://localhost:3000/events/<session_uuid>
```

**Response**

```json
[
  {
    "id": 1,
    "headers": { ... },
    "body": "{\"ping\":true}",
    "method": "POST",
    "received_at": "2024-01-01T12:00:00Z"
  }
]
```

## 4. Replay an Event

`POST /events/:id/replay`

Replay a captured request to a different URL by passing the target `url` parameter.

```bash
curl -X POST http://localhost:3000/events/1/replay \
  -d "url=http://example.com/target"
```

**Response**

```json
{ "status": 200, "body": "OK" }
```

---

For a quick walkthrough of project setup and UI features see `README.md`. The API endpoints listed here correspond to **Issue #8** in `ISSUES.md`.
