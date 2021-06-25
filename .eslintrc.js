module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2020: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier"
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {}
  },
  plugins: ["@typescript-eslint","prettier"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",

    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",

    "@typescript-eslint/no-non-null-assertion": "off",
    //'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  }
}
