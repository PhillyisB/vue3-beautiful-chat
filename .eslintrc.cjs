/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [ "plugin:vue/vue3-essential", "plugin:vue/vue3-strongly-recommended", "plugin:vue/vue3-recommended", "eslint:recommended", "@vue/eslint-config-typescript/recommended" ],
  env: {
    "vue/setup-compiler-macros": true,
    "node": true,
  },
  overrides: [
    {
      files: [ "cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}" ],
      extends: [ "plugin:cypress/recommended" ],
    },
  ],
  rules: {
    "array-bracket-spacing": [ "warn", "always" ],
    "camelcase": [ "error" ],
    "id-denylist": [ "error", "window", "document" ],
    "indent": [ "warn", 2 ],
    "linebreak-style": [ "off" ],
    "max-len": [ "off" ],
    "no-debugger": [ "warn" ],
    "object-curly-spacing": [ "warn", "always" ],
    "quote-props": [ "warn", "consistent" ],
    "quotes": [ "warn", "double" ],
    "space-before-function-paren": [ "warn", "always" ],
    "vue/html-self-closing": [ "warn", {
      "html": {
        "void": "always",
        "normal": "always",
        "component": "always"
      },
      "svg": "always",
      "math": "always"
    } ],
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: 5,
        multiline: 5,
      },
    ],
  },
};
