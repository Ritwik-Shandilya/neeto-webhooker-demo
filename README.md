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

### Inspector UI

Once both backend and frontend are running, open <http://localhost:5173> in your browser. Enter the `uuid` of a webhook session in the input box at the top to load captured events.

* **Left pane:** list of events with a search box.
* **Right pane:** details for the selected event.
* **Replay:** click the "Replay" button to open a modal and send the request payload to a new URL.

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

### Sending Test Webhooks from the Browser

The Inspector UI now includes a **Send Test Webhook** form. Enter a session UUID
and raw JSON payload, then click "Send" to POST the data directly to
`/webhooks/:uuid`. The response status and body are displayed under the form, and
the new request will appear in the event list automatically.

### Managing Sessions

Create a new webhook session (optional `name` parameter for a persistent session):

```bash
curl -X POST http://localhost:3000/sessions -d "name=my-session"
```

The response returns a `uuid` to use with `/webhooks/:uuid`. Anonymous sessions
expire after **7 days**. Accessing an expired session will return `410 Gone`.

```bash
curl -X POST http://localhost:3000/sessions
```

### API Reference

Detailed request and response examples for all endpoints are available in
[`api-docs.md`](api-docs.md).

---

These instructions cover the project setup described in the [PRD](prd_webhook.md).
The webhook receiver corresponds to **Issue #1**, the event listing and replay API to **Issue #4**, and the in-browser webhook sender to **Issue #7** in [ISSUES.md](ISSUES.md). The API documentation file was added for **Issue #8**.

### End-to-End Testing

A minimal QA script and manual test plan are provided under the `qa/` folder for **Issue #9**.

1. Start the Rails API server and the React development server.
2. Run `bash qa/e2e_test.sh` (or follow `qa/manual-test-plan.md`) to create a session, send a test webhook, list events, and replay it to `http://httpbin.org/post`.
3. Open the Inspector UI at <http://localhost:5173> and verify the test webhook appears and replays successfully.

### Deployment

The repository includes a `render.yaml` for deploying the app to [Render](https://render.com).
Build the frontend and copy the generated files into `backend/public`:

```bash
cd frontend
npm install
npm run build
cp -r dist/* ../backend/public/
```

Create a Render web service using `backend/Dockerfile` and set the `RAILS_MASTER_KEY`
from `backend/config/master.key`. During deploy the service runs `bundle exec rails db:migrate`.
