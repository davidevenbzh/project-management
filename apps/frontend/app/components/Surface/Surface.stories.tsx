import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { AppButton } from "../Button/AppButton";
import { AppText } from "../Text/AppText";
import { Surface } from "./Surface";

const meta = {
  title: "Components/Surface",
  component: Surface,
  tags: ['autodocs'],
  args: {
    accent: "primary",
    eyebrow: "Overview",
    title: "Release window",
    description:
      "Track deployment readiness, blockers, and operator actions in one place.",
    children: (
      <AppText variant="body1">
        The surface component gives the rest of the library a consistent frame
        with enough contrast for dense content.
      </AppText>
    ),
  },
} satisfies Meta<typeof Surface>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/overview/i)).toBeVisible();
    await expect(
      canvas.getByRole("heading", { name: /release window/i }),
    ).toBeVisible();
    await expect(canvas.getByText(/track deployment readiness/i)).toBeVisible();
  },
};

export const WithActions: Story = {
  args: {
    actions: <AppButton tone="secondary">Inspect queue</AppButton>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("button", { name: /inspect queue/i }),
    ).toBeVisible();
  },
};
