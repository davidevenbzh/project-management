import type { Meta, StoryObj } from "@storybook/react-vite";

import { AppTitle } from "./AppTitle";

const meta = {
  title: "Components/Title",
  component: AppTitle,
  args: {
    kicker: "Control layer",
    children: "Command center",
    subtitle:
      "A clear entry point for actions, alerts, and operational context.",
  },
} satisfies Meta<typeof AppTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Hero: Story = {
  args: {
    variant: "h1",
    kicker: "Dark launch",
    children: "Neon workflow surface",
  },
};
