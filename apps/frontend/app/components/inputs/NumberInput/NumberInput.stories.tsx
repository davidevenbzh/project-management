import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { NumberInput } from "./NumberInput";

const meta = {
  title: "Components/Inputs/NumberInput",
  component: NumberInput,
  tags: ["autodocs"],
  args: {
    label: "Story points",
    helperText: "Estimate the effort for the selected task.",
    fullWidth: true,
    inputProps: {
      min: 1,
      max: 21,
    },
    defaultValue: 8,
  },
} satisfies Meta<typeof NumberInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("spinbutton", { name: /story points/i });
    await expect(input).toBeVisible();
    await expect(input).not.toBeDisabled();
    await userEvent.clear(input);
    await userEvent.type(input, "13");
    await expect(input).toHaveValue(13);
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("spinbutton", { name: /story points/i });
    await expect(input).toBeDisabled();
  },
};
