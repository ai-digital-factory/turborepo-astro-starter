#!/bin/bash
set -e

# Get the directory where the script is located, then go up one level to root
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

NETWORK_NAME="turborepo-astro-starter-network"
if ! docker network ls | grep -q "$NETWORK_NAME"; then
  echo "Creating network: $NETWORK_NAME..."
  docker network create "$NETWORK_NAME"
fi

echo "Starting Backend services..."
docker compose -f "$REPO_ROOT/apps/backend/docker-compose.yml" up -d

echo "Starting Caddy services..."
docker compose -f "$REPO_ROOT/apps/caddy/docker-compose.yml" up -d

echo "All services started successfully!"