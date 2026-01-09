# Caddy Reverse Proxy

This folder contains the Caddy configuration used to route traffic to the Convex services.

## 🛠️ Prerequisites

Before starting the Caddy service, you **must** create the external Docker network used by all services in this project:

```bash
docker network create turbo-astro-starter-network
```

## 🏗️ Configuration

Caddy is configured to act as a reverse proxy for the following domains:

| Domain | Backend Service |
| :--- | :--- |
| `convex-dashboard.reelfreakz.com` | Proxies to `dashboard:6791` |
| `convex-backend.reelfreakz.com` | Proxies to `backend:3210` |

## 🚀 Running Caddy

To start the reverse proxy:

```bash
docker compose up -d
```

## 📂 Volume Mapping

The following host directories are used for persistent storage:
- `/var/lib/turbo-astro-starter/caddy-data` (Certificates & data)
- `/var/lib/turbo-astro-starter/caddy-config` (Configuration)
