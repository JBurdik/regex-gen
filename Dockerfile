FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.27.0 --activate
WORKDIR /app

# --- Install dependencies ---
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/package.json
COPY packages/env/package.json packages/env/package.json
COPY packages/config/package.json packages/config/package.json
RUN pnpm install --frozen-lockfile

# --- Build ---
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=deps /app/packages/env/node_modules ./packages/env/node_modules
COPY . .
RUN pnpm --filter web build

# --- Production ---
FROM base AS production
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=deps /app/packages/env/node_modules ./packages/env/node_modules
COPY --from=build /app/apps/web/dist ./apps/web/dist
COPY apps/web/package.json apps/web/package.json
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/env/ packages/env/
COPY packages/config/ packages/config/
EXPOSE 3000
CMD ["node", "apps/web/dist/server/server.js"]
