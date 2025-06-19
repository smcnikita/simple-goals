# Simple Goals

A self-hosted app to set and track your yearly goals with ease.

## 🚀 Quick Start (Self-Hosting with Docker)

### 1. Configure Environment Variables

Edit the `environment` section in your `docker-compose.yml` file:

- `NEXTAUTH_URL` – Base URL of your app.
- `NEXTAUTH_SECRET` – Secret key for NextAuth authentication.
- `DATABASE_URL` – PostgreSQL connection string.

**Example:**

```yml
environment:
  - NEXTAUTH_URL=http://localhost:9096
  - NEXT_TELEMETRY_DISABLED=1
  - NEXTAUTH_SECRET=your_secret_key
  - DATABASE_URL=postgresql://appuser:apppassword@postgres:5432/appdb?schema=public
```

### 2. Start the App via Docker

Run the following command to build and start the containers in detached mode:

```bash
docker compose up --build -d
```

### 3. Update the App

To update the app with the latest code and rebuild the containers:

```bash
# 1. Stop and remove existing containers
docker compose down

# 2. Pull the latest code
git pull

# 3. Start the containers again
docker compose up --build -d
```

### 4. Open the App

Access your app in the browser:

- 👉 `http://localhost:9096` (for local use)
- 👉 `http://your-server-ip:9096` (for remote access)

**Notes:**

- 🔥 Firewall: Ensure port 9096 is open for external access.
- 🐞 Troubleshooting: Use `docker compose logs` to view logs if the app fails to start.

---

## 🛠 Development Setup

1. Install dependencies

   ```bash
   npm install
   ```

2. Initialize the database

   ```bash
   npx prisma db push     # Apply schema to database
   npx prisma generate    # Generate Prisma client
   npx prisma db seed     # Seed initial data (optional)
   ```

3. Run the development server
   ```bash
   npm run dev
   ```
