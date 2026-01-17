#!/bin/bash
set -e

# Capture start time for duration measurement
START_TIME=$(date +%s.%N)

# Get the directory where the script is located, then go up one level to root
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

NETWORK_NAME="turborepo-astro-starter-network"
if ! docker network inspect "$NETWORK_NAME" >/dev/null 2>&1; then
  echo "Creating network: $NETWORK_NAME..."
  docker network create "$NETWORK_NAME"
fi

echo "Building and starting Worker service..."
docker compose -f "$REPO_ROOT/apps/worker/docker-compose.yml" up -d --build

# Capture end time and calculate duration
END_TIME=$(date +%s.%N)
DURATION=$(echo "$END_TIME - $START_TIME" | bc)

echo "Worker service started successfully!"
printf "Total duration: %.2f seconds\n" "$DURATION"
