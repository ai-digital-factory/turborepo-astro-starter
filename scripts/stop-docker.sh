#!/bin/bash

# Exit on error
set -e

# Get the directory where the script is located, then go up one level to root
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "Stopping Caddy services..."
docker compose -f "$REPO_ROOT/apps/caddy/docker-compose.yml" down

echo "Stopping Worker service..."
docker compose -f "$REPO_ROOT/apps/worker/docker-compose.yml" down

echo "All services stopped successfully!"
