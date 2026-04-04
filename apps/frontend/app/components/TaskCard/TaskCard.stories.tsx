import type { Meta, StoryObj } from "@storybook/react-vite";

import { TaskCard } from "./TaskCard";

const meta = {
  title: "Components/TaskCard",
  component: TaskCard,
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
};

export const InProgress: Story = {};

export const Done: Story = {
  args: {
    status: "done",
    dueLabel: "Apr 04",
  },
};
