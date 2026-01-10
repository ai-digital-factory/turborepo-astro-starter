import tseslint from "typescript-eslint";
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

  // Base language options
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // Prettier compatibility (should always be last)
  eslintConfigPrettier,
];
