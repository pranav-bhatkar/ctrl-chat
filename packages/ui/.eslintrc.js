/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@ctrl-chat/eslint-config/react-internal.js"],
  parser: "@typescript-eslint/parser",
  rules: {
    "no-redeclare": "off",
  },
};
