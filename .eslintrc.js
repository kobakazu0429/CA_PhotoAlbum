module.exports = {
  root: true,
  env: { node: true, browser: true, es6: true },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "linebreak-style": ["error", "unix"],
    indent: ["error", 2],
    quotes: ["error", "double"],
    semi: ["error", "always"]
  },
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 6,
    sourceType: "module"
  }
};
