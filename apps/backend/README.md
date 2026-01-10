# Convex Self-Hosted

This folder contains the configuration and documentation for running a self-hosted Convex instance.

## 📖 Resources

- **Self-Hosted Guide**: [Convex Backend README](https://github.com/get-convex/convex-backend/blob/main/self-hosted/README.md)
- **Docker Configuration**: [Official docker-compose.yml](https://github.com/get-convex/convex-backend/tree/main/self-hosted/docker/docker-compose.yml)

## 🔑 Generating Admin Key

To log into the dashboard, you must generate an admin key from the backend service:

```bash
docker compose exec backend ./generate_admin_key.sh
```

**Example Output:**

```text
Admin key:
convex-self-hosted|xxx
```

> [!IMPORTANT]
> Make sure to copy the entire string, including the `convex-self-hosted|` prefix.

## 🚀 Login Information

When prompted by the dashboard, use the following details:

- **Deployment URL**: `https://starter-convex-backend.reelfreakz.com`
- **Admin Key**: The key you generated above.

## 🌐 Important URLs

| Service       | URL                                                                                                  |
| :------------ | :--------------------------------------------------------------------------------------------------- |
| **Dashboard** | [https://starter-convex-dashboard.reelfreakz.com/](https://starter-convex-dashboard.reelfreakz.com/) |
| **Backend**   | [https://starter-convex-backend.reelfreakz.com](https://starter-convex-backend.reelfreakz.com)       |

## 📄 Create a `.env.local` File

Create a file named `.env.local` in the root of this directory with the following content:

```env
CONVEX_SELF_HOSTED_URL="https://starter-convex-backend.reelfreakz.com"
CONVEX_SELF_HOSTED_ADMIN_KEY="convex-self-hosted|xxxx"
CONVEX_URL="https://starter-convex-backend.reelfreakz.com"
```

> **Note:** Replace `convex-self-hosted|xxxx` with your actual admin key.  
> Always enclose values in double quotes to avoid parsing errors.
