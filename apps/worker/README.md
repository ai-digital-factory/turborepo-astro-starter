# 🛠️ Worker Service

Welcome to the **Worker Service**! This app powers background tasks and processing within our system.

---

## 🚀 Quick Test: Is the Worker Running?

You can verify that the worker service is up and operational by running the following command from your terminal:

```bash
curl -X POST https://starter-worker.reelfreakz.com/execute
```

If everything is working, you'll receive a response from the worker service.

---

### 📬 Need Help?

- Be sure your environment is up and configured (see the main project README for details).
- For more endpoints or advanced usage, check the service's API documentation.

Enjoy automating with our Worker! 😊

## Changelog

### 2026-01-18

- **ci**: Add GitHub Actions workflow for worker integration tests
- **feat**: Add integration test to verify worker status via curl and automated test script

### 2026-01-17

- **perf**: Optimized Docker build with turbo prune - reduced build time from 135s to ~60-80s (cold) and ~20-30s (warm rebuilds)
- **chore**: Removed port bindings from docker-compose.yml for starter-worker service
