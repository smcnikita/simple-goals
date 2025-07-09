# Simple Goals

A self-hosted app to set and track your yearly goals with ease.

Demo: https://simple-goals.vercel.app/

## 📸 Screenshots

[All screenshots](./docs/screenshots.md)

![Screenshot](./docs/screenshots/2.png)

## 🚀 Quick Start (Self-Hosting with Docker)

### 1. Create `docker-compose.yml` file

```yml
services:
  simple-goals:
    image: smcnikita/simple-goals
    container_name: simple-goals-app
    restart: unless-stopped
    ports:
      - 9096:3000
    environment:
      - NEXTAUTH_URL=http://localhost:9096
      - NEXTAUTH_SECRET=your_secret_key
      - DATABASE_URL=postgresql://appuser:apppassword@postgres:5432/appdb?schema=public
    depends_on:
      postgres:
        condition: service_healthy

  postgres:
    image: postgres:16
    container_name: simple-goals-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: appuser
      POSTGRES_PASSWORD: apppassword
      POSTGRES_DB: appdb
    volumes:
      - simple-goals-postgres:/var/lib/postgresql/data
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U appuser -d appdb']
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  simple-goals-postgres:
```

Edit the `environment` section:

- `NEXTAUTH_SECRET` – Secret key for NextAuth authentication.

Generate NEXTAUTH_SECRET:

```bash
openssl rand -base64 32
```

### 2. Start the App via Docker

Run the following command to build and start the containers in detached mode:

```bash
docker compose up -d
```

### 3. Open the App

Access your app in the browser:

- 👉 `http://localhost:9096` (for local use)
- 👉 `http://your-server-ip:9096` (for remote access)

---

## 🛠 Development Setup

1. Install dependencies

   ```bash
   npm install
   ```

2. Initialize the database

   ```bash
   # Apply schema to database
   npx prisma migrate dev

   # Seed initial data (optional)
   npx prisma db seed
   ```

3. Run the development server
   ```bash
   npm run dev
   ```
