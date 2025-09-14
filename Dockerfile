FROM node:22.16.0-alpine AS production

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY prisma/schema.prisma prisma/schema.prisma

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm install --prod --no-optional --ignore-scripts

RUN pnpx prisma generate

COPY . .

RUN pnpm build

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

CMD sh -c "\
  pnpx prisma migrate deploy && \
  ./node_modules/.bin/tsx prisma/seeders/seed.ts && \
  pnpm start"
