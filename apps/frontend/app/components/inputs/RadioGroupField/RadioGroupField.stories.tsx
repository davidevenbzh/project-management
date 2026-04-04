import type { Meta, StoryObj } from "@storybook/react-vite";

import { RadioGroupField } from "./RadioGroupField";

const meta = {
  title: "Components/Inputs/RadioGroupField",
  component: RadioGroupField,
  args: {
    label: "Release mode",
    name: "release-mode",
    helperText: "Pick the cadence that matches the current sprint objective.",
    defaultValue: "guarded",
    options: [
      {
        label: "Guarded",
        value: "guarded",
        description: "Roll out behind operator review and manual promotion.",
      },
      {
        label: "Fast lane",
        value: "fast",
        description: "Promote immediately after checks pass.",
      },
    ],
  },
} satisfies Meta<typeof RadioGroupField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Inline: Story = {
  args: {
    row: true,
    options: [
      { label: "Daily", value: "daily" },
      { label: "Weekly", value: "weekly" },
      { label: "Manual", value: "manual" },
    ],
  },
};
