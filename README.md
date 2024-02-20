1 client
vite 


Eslint  Prettier

npm init --y

npm install eslint eslint-config-prettier prettier –-save-dev
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
