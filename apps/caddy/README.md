# Caddy Reverse Proxy

This folder contains the Caddy configuration used to route traffic to the Convex services.

## 🛠️ Prerequisites

Before starting the Caddy service, you **must** create the external Docker network used by all services in this project:

```bash
docker network create turborepo-astro-starter-network
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

## ☁️ Cloudflare DNS Configuration

To route traffic correctly, you must configure the following **A records** in your Cloudflare dashboard under **Websites > [Your Domain] > DNS > Records**:

| Type | Name | Content | Proxy Status | TTL |
| :--- | :--- | :--- | :--- | :--- |
| `A` | `convex-backend` | `122.166.57.113` | DNS only | Auto |
| `A` | `convex-dashboard` | `122.166.57.113` | DNS only | Auto |

> **Note:** Set the Proxy Status to **DNS only** (Grey Cloud) to allow Caddy to manage SSL certificates automatically.
