import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { AppTitle } from "./AppTitle";

const meta = {
  title: "Components/Title",
  component: AppTitle,
  tags: ["autodocs"],
  args: {
    kicker: "Control layer",
    children: "Command center",
    subtitle: "A clear entry point for actions, alerts, and operational context.",
  },
} satisfies Meta<typeof AppTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/control layer/i)).toBeVisible();
    await expect(canvas.getByRole("heading", { name: /command center/i })).toBeVisible();
    await expect(canvas.getByText(/clear entry point/i)).toBeVisible();
  },
};

export const Hero: Story = {
  args: {
    variant: "h1",
    kicker: "Dark launch",
    children: "Neon workflow surface",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole("heading", { name: /neon workflow surface/i });
    await expect(heading).toBeVisible();
    await expect(heading.tagName.toLowerCase()).toBe("h1");
    await expect(canvas.getByText(/dark launch/i)).toBeVisible();
  },
};
