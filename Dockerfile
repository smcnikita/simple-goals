FROM node:22.14.0-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY .env .env
RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build

FROM node:22.14.0-alpine AS production
WORKDIR /app

COPY --from=builder /app ./

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

ENV NODE_ENV=production

EXPOSE 3000
EXPOSE 5555

CMD sh -c "\
  npx prisma migrate deploy && \
  npx prisma db seed && \
  node node_modules/next/dist/bin/next start"
