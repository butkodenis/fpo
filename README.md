## git

create .gitignore

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

1 client React
mkdir client
cd client
vite

### 2 Server Express

mkdir server
cd server
npm init --y

npm install express cors morgan bcrypt cookie-parser nodemon jsonwebtoken mongodb mongoose dotenv

chenge package.json

.....
"scripts": {
.....
"dev": "nodemon -L app.js",
"start": "node app.js"
},
.....

create app.js

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

Eslint Prettier

npm i -D eslint prettier eslint-plugin-prettier eslint-config-prettier eslint-plugin-node eslint-config-node
npx install-peerdeps --dev eslint-config-airbnb

create eslintrc.json
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

Configure ESLint by running this command :
eslint --init

eslintrc.json

создать в корне .prettierrc.json и вставить

{
"semi": true,
"trailingComma": "all",
"singleQuote": true,
"printWidth": 100,
"tabWidth": 2,
"arrowParens": "always"
}

create dockerfile

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
