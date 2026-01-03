import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";

export default [
  // Base configuration
  {
    ignores: ["dist", ".astro", "node_modules"],
  },

  // TypeScript configuration
  ...tseslint.configs.recommended,

  // React configuration for JS/TS/TSX files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
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
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off", // Not needed for modern React/Astro
      "react/no-unknown-property": "error", // Catch 'class' instead of 'className' in React
    },
  },

  // Astro configuration
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs["jsx-a11y-recommended"],
  {
    files: ["**/*.astro"],
    plugins: {
      react: reactPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // This rule will catch 'class' being used in React JSX expressions within Astro files
      // but allow 'class' in Astro template HTML (outside JSX expressions)
      "react/no-unknown-property": [
        "error",
        {
          ignore: ["class"], // Allow 'class' in Astro files
        },
      ],
    },
  },

  // Prettier compatibility (should always be last)
  eslintConfigPrettier,
];
