# Simple Goals

A lightweight, self-hosted app to set, track, and organize your yearly goals — with encryption and clear progress
statistics.

![Screenshot](./docs/screenshots/1.png)

[All screenshots](./docs/screenshots.md)

## ✨ Features

- Set and track your yearly goals.

- Add descriptions and statuses (e.g., in progress, completed) to each goal.

- Encrypt goals locally — your data is encrypted and stored only on your device.

- View progress and statistics by year.

- Self-hosting support — run the app on your own server without relying on third-party services.

- Multilingual interface — available in English and Russian.

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

## ⚙️ Environment Variables

| Variable        | Description                   |
| --------------- | ----------------------------- |
| NEXTAUTH_URL    | Base URL for the app          |
| NEXTAUTH_SECRET | Secret key for authentication |
| DATABASE_URL    | PostgreSQL connection string  |

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
