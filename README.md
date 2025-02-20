# Simple Goals

**Simple Goals** is a user-friendly app for creating, planning, and tracking your annual goals. We help you stay focused
on what matters, break big tasks into manageable steps, and monitor your progress throughout the year.

The project is currently under active development, but you can already start using it and try out the core features. We
are constantly working to improve the app to make it as useful and convenient as possible for you.

If you prefer to use the app independently, without relying on cloud services, you can deploy it on your own server
(self-hosted). This gives you full control over your data and customization options.

If you have any questions, suggestions, or encounter an issue, please let us know on Github. Your feedback helps us
improve!

## Versions

| Package | Version  |
| ------- | -------- |
| Node.js | v22.14.0 |
| npm     | 10.9.2   |
| nvm     | 0.39.5   |

## 👾 Commands

| Name            | Description                   |
| --------------- | ----------------------------- |
| `npm run dev`   | Starts the development server |
| `npm run build` | Builds the production package |
| `npm run start` | Starts the production server  |

## Running with Docker

To launch the application, run the following command:

```bash
docker-compose up --build -d
```

If this is the first time you're running the app (the database is not yet set up), you need to initialize the database:

```bash
docker exec -it simple_goals_app npx prisma db push
```

To create a user manually, you can use Prisma Studio. Start it with the following command:

```bash
docker exec -it simple_goals_app npx prisma studio
```

After that, open Prisma Studio in your browser (by default, it is available at http://localhost:5555) and create a user
through the intuitive interface.

To stop the application, use the command:

```bash
docker-compose down
```
