# Use Node.js 22 as the base image
FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Install dependencies only when needed
FROM base AS builder
WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter worker build

# Production image, copy all the files and run node
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 worker
USER worker

COPY --from=builder /app/apps/worker/package.json ./apps/worker/package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/worker/node_modules ./apps/worker/node_modules
COPY --from=builder /app/apps/worker/dist ./apps/worker/dist
COPY --from=builder /app/packages ./packages

EXPOSE 3001

CMD ["node", "apps/worker/dist/index.js"]
