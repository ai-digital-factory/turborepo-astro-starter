import reactConfig from "@repo/eslint-config/react.js";

export default [
  ...reactConfig,
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
                "Generic aliases like '@/' are not allowed in shared packages. Use the package-specific alias '@repo/ui/'.",
            },
          ],
        },
      ],
    },
  },
];
