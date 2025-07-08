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

---

These instructions cover the project setup described in the [PRD](prd_webhook.md) and correspond to **Issue #1** in [ISSUES.md](ISSUES.md).
