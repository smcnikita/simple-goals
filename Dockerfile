# Указываем базовый образ Node.js
FROM node:22.14.0-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта
COPY . .

# Собираем приложение
RUN npm run db:generate
RUN npm run build

# Указываем переменную среды для запуска в production-режиме
ENV NODE_ENV=production

# Открываем порт для контейнера
EXPOSE 3000

# Команда запуска приложения
CMD ["npm", "run", "start"]
