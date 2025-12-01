import tseslint from "typescript-eslint";

import sdsConfig from "@sikt/eslint-config-sds";

export default [
  {
    ignores: [
      "**/dist",
      "**/node_modules",
    ],
  },
  ...tseslint.config([
    {
      files: ["**/*.?(m)ts?(x)", "**/*.?(m)js?(x)"],
      extends: [sdsConfig],
      rules: {
        "import-x/order": "off", // Handled by a prettier plugin
        "import/order": "off", // Handled by a prettier plugin
        "@typescript-eslint/no-deprecated": "warn",
        "@typescript-eslint/prefer-nullish-coalescing": [
          "error",
          {
            ignorePrimitives: true,
          },
        ],
      },
    },
  ]),
];
