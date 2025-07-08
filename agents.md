# Codex Agents – Webhooker

This file defines Codex Agents for the Webhooker project. Each agent is responsible for a distinct domain in the codebase or product lifecycle.

## 🧠 Agents

### 1. `@backend`
Responsible for:
- Rails API architecture
- Models (`WebhookSession`, `Event`)
- Controllers for receiving and replaying webhooks
- Validations and DB migrations
- Sync replay logic using `Net::HTTP`

### 2. `@frontend`
Responsible for:
- React app bootstrapping
- Neeto UI integration
- Inspector page layout and component logic
- Axios services to consume API
- Modal, ListView, and DetailPane

### 3. `@design`
Responsible for:
- Applying Neeto UI styles and themes
- Layout consistency and spacing
- Minimal responsive design (desktop first)

### 4. `@devops`
Responsible for:
- GitHub repo structure
- Setting up `.env`, CORS config, and DB bootstrapping
- Providing local development instructions

### 5. `@docs`
Responsible for:
- Maintaining the PRD
- README.md content and structure
- Markdown-based API documentation (`api-docs.md`)

### 6. `@qa`
Responsible for:
- Manual test flow (receive > display > replay)
- Logging bugs or edge cases
- Ensuring UI/UX matches PRD expectations

---

## 📌 Notes
- Keep agents focused and loosely coupled
- PRs should mention relevant agents in description or labels
- Codex can be instructed to "assign to @backend and @frontend" for scoped reviews

