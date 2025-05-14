# Simple Goals

A self-hosted app to set and track your yearly goals with simplicity.

## 🚀 Quick Start (Self-Hosted via Docker)

### 1. **Set Up Environment**

Copy the example `.env` file and configure it:

```bash
cp .env.example .env
```

Edit the `.env` file to customize settings (e.g., database credentials, secrets).

### 2. **Launch with Docker**

Start the application in detached mode:

```bash
docker compose up --build -d
```

### 3. **Access the App**

Open your browser and navigate to: 👉 [`http://localhost:9096`](http://localhost:9096) (if running locally) or 👉
`http://your-server-ip:9096` (for remote access).

**Notes:**

- **Firewall**: Ensure port `9096` is open if accessing externally.
- **Troubleshooting**: Check logs with `docker compose logs` if the app doesn’t start.

---

## 🛠 Development Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up the database:**

   ```bash
   npx prisma db push      # Sync schema with the database
   npx prisma generate    # Generate Prisma client
   npx prisma db seed     # Seed initial data (if applicable)
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

---

### Database Migrations

Run pending migrations in production:

```bash
npx prisma migrate deploy
```
