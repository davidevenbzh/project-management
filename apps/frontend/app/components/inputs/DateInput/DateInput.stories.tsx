import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { DateInput } from "./DateInput";

const meta = {
  title: "Components/Inputs/DateInput",
  component: DateInput,
  args: {
    label: "Launch date",
    helperText: "Pick the date you intend to ship the next milestone.",
    fullWidth: true,
    defaultValue: "2026-04-12",
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DateInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // MUI date input renders with an implicit textbox role
    const input = canvasElement.querySelector("input[type='date']") as HTMLInputElement;
    await expect(input).not.toBeNull();
    await expect(input).toBeVisible();
    await expect(input).toHaveValue("2026-04-12");
    await expect(canvas.getByText(/pick the date/i)).toBeVisible();
  },
};

export const ErrorState: Story = {
  args: {
    errorText: "Date must land after the current freeze window.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/date must land after/i)).toBeVisible();
    const input = canvasElement.querySelector("input[type='date']") as HTMLInputElement;
    await expect(input).toHaveAttribute("aria-invalid", "true");
  },
};
