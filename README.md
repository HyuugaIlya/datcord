# README.md

## Проект на Next.js с TypeScript

Этот проект создан с использованием Next.js и TypeScript. 

### Установка

1. Убедитесь, что у вас установлен [Node.js](https://nodejs.org/) (версия 20+)

2. Установите зависимости:
   ```bash
   npm install
   ```

### Доступные команды

- `next dev` – запуск development-сервера на [http://localhost:3000](http://localhost:3000)
- `next build` – сборка production-версии
- `next start` – запуск production-сборки
- `next lint` – проверка кода с ESLint

### Структура проекта

```
/
├── app/                # App Router (Next.js 13+)
├── components/         # React-компоненты
├── hooks/              # Кастомные хуки
├── styles/             # Глобальные стили
├── pages/              # Роут для настройки конфигурации и подключения socket.io
├── prisma/             # Призма схема для работы с бд
├── lib/                # Вспомогательные функции
├── types/              # Глобальные TypeScript-типы
├── .eslintrc.json      # Конфигурация ESLint
├── .gitignore          # Игнорируемые файлы для Git
├── next.config.js      # Конфигурация Next.js
├── package.json        # Зависимости и скрипты
├── README.md           # Этот файл
├── tailwind.config.js  # Конфигурация Tailwind CSS
├── tailwind.config.js  # Конфигурация Tailwind CSS
├── README.md           # Этот файл
└── tsconfig.json       # Конфигурация TypeScript
```

### Технологии

- [Next.js](https://nextjs.org/) – React-фреймворк
- [TypeScript](https://www.typescriptlang.org/) – Типизированный JavaScript
- [ZUSTAND](https://zustand.docs.pmnd.rs/getting-started/introduction) – Стейт-менеджер для приложения
- [Prisma](https://www.prisma.io/) – ORM для работы с БД
- [React Query](https://tanstack.com/query/v3/docs/framework/react/overview) – Data-fetching библиотека для React с собственным кешированием
- [ESLint](https://eslint.org/) – Линтер для JavaScript/TypeScript
