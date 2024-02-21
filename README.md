#### Client React

1. установить vite

```javascript
npm create vite@latest client
cd client
npm install
```

2. добавить Eslint Prettier

```javascript
npm install --save-dev prettier eslint-config-airbnb eslint-config-prettier eslint-plugin-prettier
```

3. заменяем в .eslintrc.cjs

```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'airbnb',
    'airbnb/hooks',
    'prettier',
    'prettier/react',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: '18.2',
    },
  },
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'prettier/prettier': 'error',
  },
};
```

4. создать в корне .prettierrc.json и вставить

```json
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "always"
}
```

#### Server (Express)

1. создать папку для серверной части
   mkdir server
   cd server
   npm init --y

2. установить нужные модули

```
    npm install express cors morgan bcrypt cookie-parser nodemon jsonwebtoken mongodb mongoose dotenv
```

3. добавить nodemon в package.json для перезагрузки сервера

```
   .....
   "scripts": {
   .....
   "dev": "nodemon -L app.js",
   "start": "node app.js"
   },
   .....
```

4. создать сервер app.js

```
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

const app = express();

app.use(morgan('tiny'));
app.use(cors());

app.get('/api/test', (req, res) => {
res.json({ message: 'Hello from server!' });
});

const port = process.env.NODE_PORT || 4000;
app.listen(port, () => {
console.log(`Сервер запущен на порту ${port}`);
});
```

5. доабавить Eslint Prettier (для разработки)

```
npm i -D eslint prettier eslint-plugin-prettier eslint-config-prettier eslint-plugin-node eslint-config-node

```

```
npx install-peerdeps --dev eslint-config-airbnb
```

создать в корне (server) eslintrc.json

```json
{
  "extends": ["airbnb", "prettier", "plugin:node/recommended"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error",
    "no-unused-vars": "warn",
    "no-console": "off",
    "func-names": "off",
    "no-process-exit": "off",
    "object-shorthand": "off",
    "class-methods-use-this": "off"
  }
}
```

Configure ESLint by running this command :
eslint --init

eslintrc.json

создать в корне .prettierrc.json и вставить

```json
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "always"
}
```

### Docker

##### Client

1. добавить в package.json
   "scripts": {
   ....
   "dev-exposed": "vite --host",
   "....
   },

2. создать .dockerfile

```javascript
# используем образ node:18
FROM node:18
# устанавливаем директорию приложения внутри контейнера
WORKDIR /app
# копируем package.json и package-lock.json для установки зависимостей
COPY ./package*.json .
# устанавливаем зависимости приложения
RUN npm install
# Копируйте все файлы вашего приложения в рабочую директорию в контейнере
COPY . .
# Указываем порт, на котором будет работать приложение
#EXPOSE 5173
# Запустите приложение при старте контейнера
CMD [ "npm", "run", "dev-exposed" ]
```

##### Server

1.  добавить в package.json
    "scripts": {
    ....
    "dev": "nodemon -L app.js",
    "start": "node app.js"
    },

2.  create .dockerfile

```javascript
# используем образ node:18
FROM node:18
# устанавливаем директорию приложения внутри контейнера
WORKDIR /app
# копируем package.json и package-lock.json для установки зависимостей
COPY package*.json .
# устанавливаем зависимости приложения
RUN npm install
# Копируйте все файлы вашего приложения в рабочую директорию в контейнере
COPY . .
# Указываем порт, на котором будет работать приложение
# EXPOSE 4040
# Запустите приложение при старте контейнера
CMD ["npm", "run", "dev"]

```

#### Docker-compose

```javascript
version: '3.8'
services:
  server:
    build:
      context: ./server
      dockerfile: dockerfile
    container_name: server
    restart: unless-stopped
    env_file: ./server/.env
    ports:
      # local->container
      - 4004:4004
    volumes:
      - ./server:/app
      - /app/node_modules
    environment:
      - TZ=Europe/Kiev

  client:
    build:
      context: ./client
      dockerfile: dockerfile
    container_name: client
    stdin_open: true
    tty: true
    ports:
      # local->container
      - '5173:5173'
    volumes:
      - ./client:/app
      - /app/node_modules
    environment:
      - CHOKIDAR_USEPOLLING=true
      - TZ=Europe/Kiev
    depends_on:
      - server


```

#### Git

create .gitignore

```git
 node_modules/

 /.pnp
 .pnp.js
 # testing
 /coverage
 # production
 /build
 # misc
 .DS_Store
 .env.local
 .env.development.local
 .env.test.local
 .env.production.local
 npm-debug.log*
 yarn-debug.log*
 yarn-error.log\*
 .vscode/settings.json
```
