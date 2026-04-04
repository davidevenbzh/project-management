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
- **ESLint flat config** — configs live in `packages/eslint-config/`. All lint violations are warnings (`eslint-plugin-only-warn`); `--max-warnings 0` is enforced in CI/frontend.
- **Shared configs** — extend `@repo/typescript-config` and `@repo/eslint-config` in each app; do not duplicate compiler options.
- **Turbo task graph** — `build` depends on `^build` (dependencies first). Don't add long-running tasks to `build`; use `dev` with `cache: false, persistent: true`.
- **Package manager** — use `pnpm` only; do not generate `package-lock.json` or `yarn.lock`.
- **CDK best practices** — use constructs, avoid hardcoding ARNs, use environment variables for config, write tests for critical infrastructure.
- **Frontend** — use React Router v7 for routing, Tailwind CSS v4 for styling, and keep components small and reusable. Use absolute imports from `src/` for cleaner code.
- **Backend** — use AWS Lambda with API Gateway for serverless functions, DynamoDB for storage. Keep Lambdas focused on a single responsibility and use environment variables for configuration.
- **Barrels** — avoid index.ts barrels; they can cause circular dependencies and slow down TypeScript compilation. Import directly from source files.
- **Documentation** — use JSDoc comments for all functions and classes, especially public APIs. Maintain a README.md in each package with usage instructions and examples.
- **Naming conventions** — use camelCase for variables and functions, PascalCase for classes and React components, and UPPER_SNAKE_CASE for constants. Prefix private fields with an underscore (_).