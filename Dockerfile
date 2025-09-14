# --- Этап 1: Сборка ---
FROM node:22.16.0-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY prisma/schema.prisma prisma/schema.prisma

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

# --- Этап 2: Продакшен-образ ---
FROM node:22.16.0-alpine AS production

RUN npm install -g pnpm

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/.next/ ./.next/
COPY --from=builder /app/public/ ./public/
COPY --from=builder /app/prisma/ ./prisma/
COPY --from=builder /app/node_modules/.prisma/client/ ./node_modules/.prisma/client/

RUN pnpm install --prod --no-optional --ignore-scripts

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

CMD ["pnpm", "start"]
