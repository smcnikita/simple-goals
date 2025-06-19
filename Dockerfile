FROM node:22.16.0-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build

FROM node:22.16.0-alpine AS production
WORKDIR /app

COPY --from=builder /app ./

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

ENV NODE_ENV=production

EXPOSE 3000

CMD sh -c "\
  npx prisma migrate deploy && \
  npx prisma db seed && \
  npm start"
