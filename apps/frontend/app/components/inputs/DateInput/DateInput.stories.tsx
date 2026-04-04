import type { Meta, StoryObj } from "@storybook/react-vite";

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
} satisfies Meta<typeof DateInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ErrorState: Story = {
  args: {
    errorText: "Date must land after the current freeze window.",
  },
};
