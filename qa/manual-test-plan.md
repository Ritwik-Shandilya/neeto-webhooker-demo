# Manual Test Plan

This document outlines how to verify the complete webhook workflow.

1. **Start services**
   - From `backend` run `bin/rails server`.
   - From `frontend` run `npm run dev`.
2. **Create a session**
   ```bash
   curl -X POST http://localhost:3000/sessions
   ```
   Save the returned `uuid`.
3. **Send a test webhook**
   ```bash
   curl -X POST http://localhost:3000/webhooks/<uuid> \
     -H "Content-Type: application/json" \
     -d '{"hello": "world"}'
   ```
4. **Open the Inspector UI**
   - Visit <http://localhost:5173> and enter the same `uuid`.
   - The new request should appear in the list.
5. **Replay the event**
   - Click "Replay" and use `http://httpbin.org/post` as the target URL.
   - A `200` response should be displayed.
6. **Verify**
   - Ensure the event list updates and no errors are shown.
