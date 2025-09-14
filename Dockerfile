# --- Этап 1: Сборка ---
FROM node:22.16.0-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma/schema.prisma prisma/schema.prisma

RUN npm ci

COPY . .

RUN npm run build

# --- Этап 2: Продакшен-образ ---
FROM node:22.16.0-alpine AS production
WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/.next/ ./.next/
COPY --from=builder /app/public/ ./public/
COPY --from=builder /app/prisma/ ./prisma/
COPY --from=builder /app/node_modules/ ./node_modules/

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

CMD ["npm", "start"]
