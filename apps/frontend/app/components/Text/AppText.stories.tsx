import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { AppText } from "./AppText";

const meta = {
  title: "Components/Text",
  component: AppText,
  tags: ["autodocs"],
  args: {
    children: "Track execution, review state changes, and keep each interaction legible.",
    variant: "body1",
  },
} satisfies Meta<typeof AppText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/track execution/i)).toBeVisible();
  },
};

export const MutedMono: Story = {
  args: {
    mono: true,
    tone: "muted",
    children: "system.status = watching",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const el = canvas.getByText(/system\.status/i);
    await expect(el).toBeVisible();
    await expect(el).toHaveClass("pm-text--muted");
    await expect(el).toHaveClass("pm-text--mono");
  },
};

export const Accent: Story = {
  args: {
    tone: "accent",
    variant: "subtitle1",
    children: "Live signal locked",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const el = canvas.getByText(/live signal locked/i);
    await expect(el).toBeVisible();
    await expect(el).toHaveClass("pm-text--accent");
  },
};
