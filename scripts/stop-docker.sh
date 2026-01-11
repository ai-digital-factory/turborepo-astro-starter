#!/bin/bash

# Exit on error
set -e

echo "Stopping Caddy services..."
docker compose -f apps/caddy/docker-compose.yml down

echo "Stopping Backend services..."
docker compose -f apps/backend/docker-compose.yml down

echo "All services stopped successfully!"
