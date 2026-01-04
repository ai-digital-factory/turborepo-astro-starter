import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Base configuration
  {
    ignores: ["dist", "dist-electron", "node_modules", ".turbo"],
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
      "react/react-in-jsx-scope": "off",
      "react/no-unknown-property": "error",
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "Program > ExpressionStatement > CallExpression[callee.property.name='on'][callee.object.property.name='ipcRenderer']",
          message:
            "IPC listeners should be registered inside a useEffect hook to ensure proper cleanup and avoid memory leaks. Top-level registration causes memory leaks as listeners are never removed.",
        },
      ],
    },
  },

  // Prettier compatibility (should always be last)
  eslintConfigPrettier,
];
