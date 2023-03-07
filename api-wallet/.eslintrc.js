module.exports = {
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": "standard-with-typescript",
  "overrides": [
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "tsconfigRootDir": __dirname,
    "project": ['./tsconfig.json']
  },
  "ignorePatterns": ['node_modules/**', '*.js'],
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
  }
};
