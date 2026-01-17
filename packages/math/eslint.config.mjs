import baseConfig from "@repo/eslint-config/base.js";

export default [
  ...baseConfig,
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/*"],
              message:
                "Generic aliases like '@/' are not allowed in shared packages. Use the package-specific alias '@repo/math/'.",
            },
          ],
        },
      ],
    },
  },
];
