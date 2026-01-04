import eslintPluginAstro from "eslint-plugin-astro";
import reactPlugin from "eslint-plugin-react";
import globals from "globals";
import reactConfig from "./react.js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...reactConfig,

  // Astro-specific ignores
  {
    ignores: [".astro"],
  },

  // Astro configuration
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs["jsx-a11y-recommended"],
  {
    files: ["**/*.astro"],
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/no-unknown-property": "off", // Astro uses 'class', so we disable this rule for .astro files
    },
  },
];
