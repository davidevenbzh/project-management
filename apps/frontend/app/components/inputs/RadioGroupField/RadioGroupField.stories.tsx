import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { RadioGroupField } from "./RadioGroupField";

const meta = {
  title: "Components/Inputs/RadioGroupField",
  component: RadioGroupField,
  tags: ["autodocs"],
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

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radios = canvas.getAllByRole("radio");
    await expect(radios).toHaveLength(2);
    // Default value "guarded" is selected
    await expect(canvas.getByRole("radio", { name: /guarded/i })).toBeChecked();
    await expect(
      canvas.getByRole("radio", { name: /fast lane/i }),
    ).not.toBeChecked();
    await expect(canvas.getByText(/pick the cadence/i)).toBeVisible();
  },
};

export const Inline: Story = {
  args: {
    row: true,
    options: [
      { label: "Daily", value: "daily" },
      { label: "Weekly", value: "weekly" },
      { label: "Manual", value: "manual" },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole("radio")).toHaveLength(3);
    // MUI hides the <input> with CSS; check the visible labels instead
    await expect(canvas.getByText("Daily")).toBeVisible();
    await expect(canvas.getByText("Weekly")).toBeVisible();
    await expect(canvas.getByText("Manual")).toBeVisible();
  },
};
