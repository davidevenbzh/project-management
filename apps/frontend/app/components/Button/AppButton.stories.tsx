import type { Meta, StoryObj } from "@storybook/react-vite";

import { AppButton } from "./AppButton";

const meta = {
  title: "Components/Button",
  component: AppButton,
  args: {
    children: "Deploy node",
    tone: "primary",
  },
} satisfies Meta<typeof AppButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    tone: "secondary",
    children: "Schedule sync",
  },
};

export const Ghost: Story = {
  args: {
    tone: "ghost",
    children: "Open logs",
  },
};

export const DangerLoading: Story = {
  args: {
    tone: "danger",
    children: "Terminate run",
    loading: true,
  },
};
