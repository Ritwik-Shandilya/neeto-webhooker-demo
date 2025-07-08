# Issue List Based on PRD

Below are proposed GitHub issues derived from `prd_webhook.md`.

## 1. Project Setup
- **Description:** Initialize Rails API-only backend and React frontend. Configure database, CORS, and integrate Neeto UI.
- **Agents:** @devops @backend @frontend
- **PRD Reference:** Development Timeline - Day 1.

## 2. Models and Migrations
- **Description:** Add `WebhookSession` and `Event` models with appropriate database migrations and validations.
- **Agents:** @backend
- **PRD Reference:** Core Features & Data Model (lines 18-27, 103-117); Development Timeline - Day 2.

## 3. Webhook Receiver Endpoint
- **Description:** Implement `POST /webhooks/:uuid` to accept and log incoming requests (headers, body, method, IP, timestamp).
- **Agents:** @backend
- **PRD Reference:** Core Features - Capture Requests (lines 23-27); API Endpoints (lines 66-72).

## 4. Event Listing and Replay API
- **Description:** Implement `GET /events/:uuid` to list captured requests and `POST /events/:id/replay` to replay them to a user-supplied URL.
- **Agents:** @backend
- **PRD Reference:** Core Features - Request Viewer & Replay (lines 29-38); API Endpoints (lines 74-81).

## 5. Session Management Logic
- **Description:** Support anonymous and named sessions with expiration for anonymous sessions. Persist URLs for logged-in users (future).
- **Agents:** @backend
- **PRD Reference:** Core Features - Session Management (lines 40-44).

## 6. React UI with Neeto UI
- **Description:** Build Inspector page with left pane (list of events) and right pane (event details). Include search/filter, replay modal, and status indicators.
- **Agents:** @frontend @design
- **PRD Reference:** Core Features - Request Viewer & Replay (lines 29-38); UI Breakdown (lines 83-101); Development Timeline - Day 3.

## 7. In-Browser Webhook Sender
- **Description:** Add UI component to send a test webhook from the browser with raw JSON input. Display HTTP response code and body. Captured requests should appear in the event list.
- **Agents:** @frontend
- **PRD Reference:** Core Features - In-Browser Webhook Sender (lines 46-54).

## 8. Documentation and API Docs
- **Description:** Expand README and create `api-docs.md` documenting endpoints and usage. Keep PRD up to date.
- **Agents:** @docs
- **PRD Reference:** Tech Stack (lines 60-64); development notes.

## 9. End-to-End Testing and QA
- **Description:** Test the full workflow (receive → display → replay). Log bugs, edge cases, and ensure UI matches PRD expectations.
- **Agents:** @qa
- **PRD Reference:** Development Timeline - Day 4; Metrics for Success (lines 119-124).

## 10. Deployment Preparation
- **Description:** Prepare deployment configuration for Render/Vercel and push the application to GitHub. Ensure system is production ready.
- **Agents:** @devops
- **PRD Reference:** Tech Stack (lines 60-64); Development Timeline - Day 4.

