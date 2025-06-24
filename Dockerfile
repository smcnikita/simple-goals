FROM node:22.16.0-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY entrypoint.sh /app/
RUN chmod +x /app/entrypoint.sh

COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN npx prisma generate
RUN npm run build

FROM node:22.16.0-alpine AS production
WORKDIR /app

COPY --from=builder /app ./

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

CMD ["./entrypoint.sh"]
