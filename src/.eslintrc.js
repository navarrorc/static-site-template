module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier",
    "prettier/react"
  ],
  rules: {
    "react/prop-types": 0,
    "no-console": "warn",
    "jsx-a11y/label-has-for": 0,
    "react/jsx-no-target-blank": 0
  },
  plugins: ["react", "import", "jsx-a11y"],
  parser: "babel-eslint",
  parserOptions: {
    allowImportExportEverywhere: true,
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    commonjs: true,
    jest: true,
    jquery: true
  }
};
