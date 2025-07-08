# Product Requirements Document (PRD) – Webhooker (Webhook.site Alternative)

## 1. Overview

**Product Name:** Webhooker
**Goal:** Build a fully functional alternative to Webhook.site using Neeto UI + React (frontend) and Ruby on Rails (backend).

Webhooker allows developers to create a unique URL to capture, inspect, and replay HTTP webhooks. It is built as a production-ready, fully operational application.

## 2. Target Users

* Developers testing third-party webhooks (e.g., Stripe, GitHub)
* QA engineers
* Backend/API teams

## 3. Core Features

### A. **Webhook URL Generation**

* Auto-generate a unique URL (UUID-based) on load or user action
* Return full webhook URL to user in response

### B. **Capture Requests**

* Accept POST requests with any payload
* Log headers, body, method, IP, and timestamp
* Store events persistently in database

### C. **Request Viewer**

* Show list of received requests in frontend (Neeto UI Pane/List)
* View full request details (headers + body)
* Search, filter by method and status

### D. **Replay**

* Replay captured request to a user-supplied URL
* Return status of replay (success or failure)

### E. **Session Management**

* Support anonymous and named sessions
* Expiration logic for anonymous sessions
* Persistent URLs for logged-in users (future)

### F. **In-Browser Webhook Sender**

* Provide a UI component where users can send a test webhook directly from the site
* Input field to enter a raw JSON body
* Button to fire a `POST` request to the current session’s webhook URL
* Display HTTP response code and response body
* Sent request should be captured like external ones and shown in the event list
* Expiration logic for anonymous sessions
* Persistent URLs for logged-in users (future)

## 4. Full Feature Commitment

All core features required for a functional webhook management application are included in this version. Any enhancements (e.g., real-time forwarding, authentication, or async processing) will be added incrementally without being deprioritized.

## 5. Tech Stack

* **Frontend:** React + Neeto UI + Axios
* **Backend:** Ruby on Rails (API-only), PostgreSQL
* **Hosting:** Localhost for dev; Render/Vercel for production

## 6. API Endpoints

Detailed request and response examples for these endpoints are provided in
[`api-docs.md`](api-docs.md).

### Webhook Receiver

* `POST /webhooks/:uuid`

  * Receives and logs requests for a session

### Events

* `GET /events/:uuid`

  * Returns array of captured requests
* `POST /events/:id/replay`

  * Replay a request to target URL

## 7. UI Breakdown

All pages and components must follow the visual and structural theme of the Neeto suite — specifically modeled after NeetoCal. This includes:

* A left-aligned vertical sidebar with labeled icons and consistent spacing
* White and light-gray page backgrounds with card/table layouts
* Neeto UI button styles (pill-shaped, green or purple based on action)
* Rounded input fields, clean fonts, consistent header spacing
* Status indicators using Neeto UI tag badges
* Neeto-styled modals, search bars, dropdowns, and icons
* Create or copy a webhook URL
* Option to view past sessions (if authenticated)

### Inspector Page

* Left pane: List of captured events
* Right pane: Detailed view of selected request
* Replay modal with target URL input
* Status indicator for replays

## 8. Data Model

**WebhookSession**

* `uuid:string`
* `created_at:datetime`

**Event**

* `webhook_session_id:integer`
* `headers:jsonb`
* `body:text`
* `method:string`
* `received_at:datetime`
* `ip_address:string`

## 9. Metrics for Success

* Webhook events are received and stored reliably
* UI updates and reflects events correctly
* Replay feature works with valid external targets
* System uptime and webhook delivery accuracy

## 10. Development Timeline (Fast-Track)

### Day 1: Setup

* Create GitHub repo
* Scaffold Rails API and React app
* Setup DB, CORS, and Neeto UI

### Day 2: Backend

* Implement models: WebhookSession, Event
* Routes: receive, list, replay
* Basic tests and validations

### Day 3: Frontend

* Build layout with Neeto UI components
* API integration with Axios
* Display list and detail views

### Day 4: Finalization

* Test flow end-to-end (receive → display → replay)
* Minor UI polish and error handling
* Push to GitHub and prepare for deploy

