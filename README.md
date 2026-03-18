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
