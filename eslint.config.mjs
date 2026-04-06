import path from "node:path";
import { fileURLToPath } from "node:url";

import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

const tsconfigRootDir = path.dirname(fileURLToPath(import.meta.url));
const importSortRules = {
  "simple-import-sort/exports": "error",
  "simple-import-sort/imports": [
    "error",
    {
      groups: [
        ["^\\u0000"],
        ["^node:"],
        ["^react$", "^@?\\w"],
        ["^~/.+"],
        ["^\\.(?!/?$)", "^\\./?$"],
      ],
    },
  ],
};

export default defineConfig([
  globalIgnores([
    ".turbo/**",
    "**/node_modules/**",
    "coverage/**",
    "apps/backend-auth-service/cdk.out/**",
    "apps/backend-auth-service/dist/**",
    "apps/frontend/.react-router/**",
    "apps/frontend/build/**",
    "apps/frontend/storybook-static/**",
  ]),
  {
    name: "repo/linter-options",
    linterOptions: {
      reportUnusedDisableDirectives: "error",
      reportUnusedInlineConfigs: "error",
    },
  },
  {
    name: "repo/javascript",
    files: ["**/*.{js,mjs,cjs}"],
    extends: [js.configs.recommended, eslintConfigPrettier],
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.node,
      },
      sourceType: "module",
    },
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      ...importSortRules,
    },
  },
  {
    name: "repo/typescript",
    files: ["**/*.{ts,tsx,mts,cts}"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      eslintConfigPrettier,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir,
      },
    },
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      ...importSortRules,
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          fixStyle: "inline-type-imports",
          prefer: "type-imports",
        },
      ],
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
    },
  },
  {
    name: "repo/frontend-react",
    files: ["apps/frontend/.storybook/**/*.{ts,tsx}", "apps/frontend/app/**/*.{ts,tsx}"],
    extends: [reactPlugin.configs.flat.recommended, reactHooks.configs.flat.recommended],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/jsx-uses-react": "off",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    name: "repo/backend-node",
    files: [
      "apps/backend-auth-service/**/*.{ts,mts,cts}",
      "apps/frontend/react-router.config.ts",
      "apps/frontend/vite.config.ts",
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
]);
