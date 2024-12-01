import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptParser from "@typescript-eslint/parser";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default tseslint.config(
    {
        ignores: ["**/dist", "**/node_modules", "**/__generated__"],
    },
    compat.extends(),
    {
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname,
            },
            globals: {
                ...globals.jest,
            },
        },
    },
    {
        files: ["**/*.{js,mjs,cjs,jsx}"],
        extends: [tseslint.configs.disableTypeChecked],
    },
);
