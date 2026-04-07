# Frontend App

This frontend now runs in React Router declarative mode on top of a standard Vite React app.

## Commands

```bash
pnpm dev
pnpm build
pnpm check-types
pnpm start
pnpm storybook
pnpm test
```

## Routing

The app uses `BrowserRouter`, `Routes`, and `Route` from `react-router` instead of the React Router framework Vite plugin and route module files.

## Build Output

`pnpm build` produces a static Vite bundle in `dist/`, which fits the intended S3/CloudFront deployment model for this app.
