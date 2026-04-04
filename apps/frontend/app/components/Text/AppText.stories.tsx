import type { Meta, StoryObj } from "@storybook/react-vite";

import { AppText } from "./AppText";

const meta = {
  title: "Components/Text",
  component: AppText,
  args: {
    children:
      "Track execution, review state changes, and keep each interaction legible.",
    variant: "body1",
  },
} satisfies Meta<typeof AppText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MutedMono: Story = {
  args: {
    mono: true,
    tone: "muted",
    children: "system.status = watching",
  },
};

export const Accent: Story = {
  args: {
    tone: "accent",
    variant: "subtitle1",
    children: "Live signal locked",
  },
};
