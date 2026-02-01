Removing Docker Compose files from the backend directory as they are no longer needed.

---

## Plan

# Remove Convex Self-Hosting Infrastructure

Remove the local Convex self-hosting infrastructure (Docker configurations and related scripts) while keeping the Convex application code (functions, schema) since the backend is now hosted externally.

## Plan

I will remove the Docker-based self-hosting configuration for Convex and update the project scripts to reflect that Convex is now managed externally. The application logic in `apps/backend/convex` will be preserved as it is needed for the external deployment.

### 1. Remove Self-Hosting Configuration

- Delete [apps/backend/docker-compose.yml](apps/backend/docker-compose.yml) which contains the local Convex and Dashboard service definitions.
- Delete [apps/backend/README.md](apps/backend/README.md) as it primarily contains instructions for self-hosting and generating admin keys.

### 2. Update Management Scripts

- Modify [scripts/start-docker.sh](scripts/start-docker.sh) to remove the command that starts the backend services.
- Modify [scripts/stop-docker.sh](scripts/stop-docker.sh) to remove the command that stops the backend services.

### 3. Documentation and Cleanup

- I will verify if any other files reference the local `docker-compose.yml` in `apps/backend` and update them accordingly.
- The `apps/backend/convex` directory will be kept intact as it contains the schema and functions that are deployed to the external Convex URL.
- The `apps/backend/package.json` will be kept as it provides the `dev` and `codegen` scripts needed to interact with the external Convex deployment.

### 4. Environment Variables

- Ensure the user is aware that `CONVEX_URL` should now point to `https://starter-convex-backend.reelfreakz.com` in their local `.env` files for the `desktop` and other apps.
