import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { AppButton } from "./AppButton";

const meta = {
  title: "Components/Button",
  component: AppButton,
  args: {
    children: "Deploy node",
    tone: "primary",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AppButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /deploy node/i });
    await expect(button).toBeVisible();
    await expect(button).not.toBeDisabled();
  },
};

export const Secondary: Story = {
  args: {
    tone: "secondary",
    children: "Schedule sync",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: /schedule sync/i })).toBeVisible();
  },
};

export const Ghost: Story = {
  args: {
    tone: "ghost",
    children: "Open logs",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: /open logs/i })).toBeVisible();
  },
};

export const DangerLoading: Story = {
  args: {
    tone: "danger",
    children: "Terminate run",
    loading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /terminate run/i });
    await expect(button).toBeDisabled();
    // Loading spinner is rendered inside the button
    await expect(canvas.getByRole("progressbar")).toBeVisible();
  },
};
