# Project Management — Copilot Instructions

A Jira/Trello-style project management app built as a portfolio project.

## Architecture

Turborepo monorepo using **pnpm workspaces**:

'apps' contains application like frontend and backend services;
'apps/backend-*-service' contains CDK infrastructure deploy on AWS with free serverless architectecture (Lambda, DynamoDB, API Gateway);*
'apps/frontend' is a React SPA using React Router v7 and Tailwind CSS v4 who can be deployed on AWS S3/CloudFront;
'packages' contains shared configs and utilities;

## Build & Test

```bash
# From repo root
pnpm dev           # Run frontend app in development mode (respects Turbo task graph)
pnpm build         # Production build (respects Turbo task graph)
pnpm lint          # ESLint across all packages
pnpm check-types   # tsc --noEmit across all packages
pnpm format        # Prettier on **/*.{ts,tsx,md}
pnpm deploy        # Deploy CDK stacks in dependency order (respects Turbo task graph)

# Scoped
pnpm --filter backend-auth-service test   # Run CDK Jest tests
pnpm --filter apps-frontend dev           # Frontend only
```

For CDK operations, `cd apps/backend-auth-service` then use `pnpm cdk synth|diff|deploy`.

## Conventions

- **TypeScript strict mode** everywhere — `noUncheckedIndexedAccess: true`, no implicit any.
- **TypeScript** — use TypeScript for all code, including CDK infrastructure. No JavaScript files, and also use best pratice of TS 5+.
- **Node** — target Node.js 22+ all code (backend and CDK), use ES2022 features, and module resolution "NodeNext" for better ESM support. Avoid legacy CommonJS patterns.
- **ESLint flat config** — configs live in `packages/eslint-config/`. All lint violations are warnings (`eslint-plugin-only-warn`); `--max-warnings 0` is enforced in CI/frontend.
- **Config inheritance** — TypeScript and ESLint configs follow explicit inheritance chains to avoid duplication. See section below.
- **Shared configs** — extend `@repo/typescript-config` and `@repo/eslint-config` in each app; do not duplicate compiler options.
- **Turbo task graph** — `build` depends on `^build` (dependencies first). Don't add long-running tasks to `build`; use `dev` with `cache: false, persistent: true`.
- **Package manager** — use `pnpm` only; do not generate `package-lock.json` or `yarn.lock`.
- **CDK best practices** — use constructs, avoid hardcoding ARNs, use environment variables for config, write tests for critical infrastructure.
- **Frontend** — use React Router v7 for routing, Tailwind CSS v4 for styling, and keep components small and reusable. Use absolute imports from `src/` for cleaner code.
- **Backend** — use AWS Lambda with API Gateway for serverless functions, DynamoDB for storage. Keep Lambdas focused on a single responsibility and use environment variables for configuration.
- **Barrels** — avoid index.ts barrels; they can cause circular dependencies and slow down TypeScript compilation. Import directly from source files.
- **Documentation** — use JSDoc comments for all functions and classes, especially public APIs. Maintain a README.md in each package with usage instructions and examples.
- **Naming conventions** — use camelCase for variables and functions, PascalCase for classes and React components, and UPPER_SNAKE_CASE for constants. Prefix private fields with an underscore (_).
- **React** — use functional components and hooks. Avoid class components. Use `useEffect` for side effects and `useMemo`/`useCallback` for performance optimizations when necessary. Prefer composition over inheritance for component reuse. Always create a stories file for each component to document its usage and edge cases. Prefer to create a custom hook for complex logic and keep components focused on rendering.

## Config Inheritance

Config files follow explicit inheritance chains in `packages/` to maintain DRY principles and ensure consistency across apps.

### TypeScript Configs

```
packages/typescript-config/
├── base.json          ← Universal settings (strict mode, ES2022, module resolution)
├── react.json         ← Extends base.json, adds Vite/React Router settings
└── cdk.json           ← Extends base.json, adds CDK-specific decorators & sourcemaps

apps/frontend/tsconfig.json       ← Extends ../../packages/typescript-config/react
apps/backend-auth-service/tsconfig.json  ← Extends ../../packages/typescript-config/cdk
```

**Note:** `tsconfig.json` `extends` uses **relative paths** (TypeScript config resolution), not workspace aliases.

**Example — Frontend:**
```json
{
  "extends": "../../packages/typescript-config/react",
  "compilerOptions": {
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "types": ["node", "vite/client"]
  }
}
```

**Example — Backend (CDK):**
```json
{
  "extends": "../../packages/typescript-config/cdk",
  "exclude": ["node_modules", "cdk.out"]
}
```

### ESLint Configs

```
packages/eslint-config/
├── base.js            ← Universal rules (JS, TypeScript, Prettier, Turbo)
├── react-internal.js  ← Extends base.js, adds React & React Hooks rules
└── cdk.js             ← Extends base.js, adds Node.js config

apps/frontend/eslint.config.js          ← Imports @repo/eslint-config/react-internal
apps/backend-auth-service/eslint.config.js  ← Imports @repo/eslint-config/cdk
```

**Example — Frontend:**
```javascript
import { config } from "@repo/eslint-config/react-internal";
import storybook from "eslint-plugin-storybook";

export default [...config, { ignores: [".react-router/**", "./build/**"] }, ...storybook.configs["flat/recommended"]];
```

**Example — Backend (CDK):**
```javascript
import { config } from "@repo/eslint-config/cdk";

export default [...config];
```

### Adding a New App

When adding a new app, follow these patterns:

1. **TypeScript**: Choose the appropriate base config:
   - React SPA → extend `../../packages/typescript-config/react` (relative path)
   - Node.js/Lambda/CDK → extend `../../packages/typescript-config/cdk` (relative path)
   - Library package → extend `../../packages/typescript-config/base` (relative path)

2. **ESLint**: Import the appropriate config (uses `@repo/` workspace alias):
   - React app → import from `@repo/eslint-config/react-internal`
   - Node.js/CDK → import from `@repo/eslint-config/cdk`
   - Minimal setup → import from `@repo/eslint-config` (base config)