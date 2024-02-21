### git

create .gitignore

```python
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

### Client React

```javascript
npm create vite@latest client
cd client
npm install
```

```javascript
npm install --save-dev prettier eslint-config-airbnb eslint-config-prettier eslint-plugin-prettier
змінюємо в .eslintrc.cjs
```

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

### 2 Server Express

    mkdir server
    cd server
    npm init --y

```python
    npm install express cors morgan bcrypt cookie-parser nodemon jsonwebtoken mongodb mongoose dotenv
```

chenge package.json

```python
   .....
   "scripts": {
   .....
   "dev": "nodemon -L app.js",
   "start": "node app.js"
   },
   .....
```

create app.js

```python
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

### Eslint Prettier

```
npm i -D eslint prettier eslint-plugin-prettier eslint-config-prettier eslint-plugin-node eslint-config-node
```

```
npx install-peerdeps --dev eslint-config-airbnb
```

create eslintrc.json

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

2. create dockerfile

```json
#используем образ node:18
FROM node:18
# устанавливаем директорию приложения внутри контейнера
WORKDIR /app

COPY ./package*.json .

RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev-exposed" ]
```

##### Server

1.  добавить в package.json
    "scripts": {
    ....
    "dev": "nodemon -L app.js",
    "start": "node app.js"
    },

2.  create dockerfile

    # используем образ node:18

    FROM node:18

    # устанавливаем директорию приложения внутри контейнера

    WORKDIR /app

    # копируем package.json и package-lock.json для установки зависимостей

    COPY package\*.json .

    # устанавливаем зависимости приложения

    RUN npm install

    # Копируйте все файлы вашего приложения в рабочую директорию в контейнере

    COPY . .

    # Указываем порт, на котором будет работать приложение

    # EXPOSE 4040

    # Запустите приложение при старте контейнера

    CMD ["npm", "run", "dev"]

### Docker-compose

```console
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
      - ./client:/usr/src/app:delegated
      - /usr/src/app/node_modules/
    environment:
      - CHOKIDAR_USEPOLLING=true
      - TZ=Europe/Kiev
    depends_on:
      - server

```
