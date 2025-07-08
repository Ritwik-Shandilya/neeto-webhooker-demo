#!/bin/bash
# Simple end-to-end test script for Webhooker
set -e
BASE_URL=${BASE_URL:-http://localhost:3000}

# Create session
SESSION=$(curl -s -X POST $BASE_URL/sessions)
UUID=$(echo "$SESSION" | jq -r '.uuid')
if [ -z "$UUID" ] || [ "$UUID" = "null" ]; then
  echo "Failed to create session" >&2
  exit 1
fi
echo "Created session $UUID"

# Send webhook
curl -s -X POST $BASE_URL/webhooks/$UUID \
  -H 'Content-Type: application/json' \
  -d '{"demo":true}' | jq .

sleep 1

# Fetch events and get first event id
EVENT_ID=$(curl -s $BASE_URL/events/$UUID | jq -r '.[0].id')
if [ -z "$EVENT_ID" ] || [ "$EVENT_ID" = "null" ]; then
  echo "No events found" >&2
  exit 1
fi
echo "Captured event $EVENT_ID"

# Replay the event to httpbin
curl -s -X POST $BASE_URL/events/$EVENT_ID/replay \
  -d url=http://httpbin.org/post | jq .

echo "E2E test completed"
