import { config as baseConfig } from "./base.js";

/**
 * A custom ESLint configuration for libraries that use Node.js and AWS CDK.
 *
 * @type {import("eslint").Linter.Config[]} */
export const config = [
  ...baseConfig,
  {
    ignores: ["cdk.out/**", "dist/**", "build/**"],
  },
];
