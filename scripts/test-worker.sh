#!/bin/bash

# Start the worker in the background
echo "Starting worker..."
# We use pnpm --filter worker dev. 
# We'll redirect output to a file so we can debug if needed, but we'll remove it on exit.
pnpm --filter worker dev > worker.log 2>&1 &
WORKER_PID=$!

# Function to cleanup on exit
cleanup() {
  echo "Cleaning up..."
  if [ -n "$WORKER_PID" ]; then
    kill $WORKER_PID 2>/dev/null
  fi
  if [ -f worker.log ]; then
    rm worker.log
  fi
}
trap cleanup EXIT

# Wait for the server to be ready
echo "Waiting for worker to be ready on port 3001..."
MAX_RETRIES=30
RETRY_COUNT=0
while ! curl -s http://localhost:3001/ > /dev/null; do
  sleep 1
  RETRY_COUNT=$((RETRY_COUNT + 1))
  if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
    echo "Worker failed to start within $MAX_RETRIES seconds."
    echo "Worker log:"
    cat worker.log
    exit 1
  fi
done
echo "Worker is ready!"

# Test GET /
echo "Testing GET /..."
GET_RESPONSE=$(curl -s http://localhost:3001/)
if [ "$GET_RESPONSE" == "Worker is running!" ]; then
  echo "GET / test passed!"
else
  echo "GET / test failed! Response: $GET_RESPONSE"
  exit 1
fi

# Test POST /execute
echo "Testing POST /execute..."
# The /execute endpoint takes 4 seconds to respond
POST_RESPONSE=$(curl -s -X POST http://localhost:3001/execute)
EXPECTED_POST_RESPONSE='{"status":"success","message":"Task completed after 4 seconds","result":300}'
if [ "$POST_RESPONSE" == "$EXPECTED_POST_RESPONSE" ]; then
  echo "POST /execute test passed!"
else
  echo "POST /execute test failed!"
  echo "Expected: $EXPECTED_POST_RESPONSE"
  echo "Received: $POST_RESPONSE"
  exit 1
fi

echo "All tests passed successfully!"
