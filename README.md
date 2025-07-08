# neeto-webhooker-demo

This demo project shows the initial setup for **Webhooker** using a Rails API backend and a React frontend. The code is split into two folders:

- `backend` – Ruby on Rails (API only)
- `frontend` – React + Vite (TypeScript)

## Prerequisites

- Ruby 3.4+
- Node.js 20+
- PostgreSQL

## Getting Started

### Backend

```bash
cd backend
bundle install
bin/rails db:create # creates local databases
bin/rails server
```

The CORS initializer `config/initializers/cors.rb` is ready to be updated to allow requests from the frontend (default Vite port is `5173`).

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will start on <http://localhost:5173> and will use Axios (to be added) to talk to the Rails API.

### Capturing Webhooks

After starting the Rails server, you can test the webhook receiver by sending a
POST request to `/webhooks/:uuid` where `:uuid` is any unique identifier. For
example:

```bash
curl -X POST http://localhost:3000/webhooks/test-uuid -d '{"ping": true}' \
  -H 'Content-Type: application/json'
```

Each request will create a `WebhookSession` (if it does not already exist) and a
corresponding `Event` record storing the headers and body.

### Listing Events

To view captured requests for a session:

```bash
curl http://localhost:3000/events/<session_uuid>
```

### Replaying Events

Replay a captured event to a new URL by supplying the target `url` parameter:

```bash
curl -X POST http://localhost:3000/events/<event_id>/replay \
  -d "url=http://example.com/target"
```

---

These instructions cover the project setup described in the [PRD](prd_webhook.md).
The webhook receiver corresponds to **Issue #1**, while the event listing and replay API correspond to **Issue #4** in [ISSUES.md](ISSUES.md).
