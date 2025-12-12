# syntax=docker/dockerfile:1

FROM node:20-alpine AS base
WORKDIR /app

ENV NODE_ENV=production

FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run check-env || true
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production

# Render/Azure provide PORT at runtime; default is 3000 in start script.
ENV PORT=3000

WORKDIR /app
COPY --from=builder /app/public ./public

# Standalone output produced by next build when next.config has output:"standalone"
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
