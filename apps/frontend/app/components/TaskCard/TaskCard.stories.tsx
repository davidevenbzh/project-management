import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { TaskCard } from "./TaskCard";

const meta = {
  title: "Components/TaskCard",
  component: TaskCard,
  tags: ["autodocs"],
  args: {
    title: "Design review",
    description:
      "Align card spacing, empty states, and drag affordances before wiring the next dashboard iteration.",
    dueLabel: "Apr 12",
    status: "in-progress",
    tags: ["ui", "frontend", "storybook"],
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof TaskCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Planned: Story = {
  args: {
    status: "planned",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByRole("article");
    await expect(card).toHaveAttribute("data-status", "planned");
    await expect(canvas.getByRole("heading", { name: /design review/i })).toBeVisible();
    await expect(canvas.getByText(/apr 12/i)).toBeVisible();
  },
};

export const InProgress: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByRole("article");
    await expect(card).toHaveAttribute("data-status", "in-progress");
    // Tags are rendered
    await expect(canvas.getByText("ui")).toBeVisible();
    await expect(canvas.getByText("frontend")).toBeVisible();
    await expect(canvas.getByText("storybook")).toBeVisible();
  },
};

export const Done: Story = {
  args: {
    status: "done",
    dueLabel: "Apr 04",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByRole("article");
    await expect(card).toHaveAttribute("data-status", "done");
    await expect(canvas.getByText(/apr 04/i)).toBeVisible();
  },
};
