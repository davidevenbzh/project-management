import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { CheckboxField } from "./CheckboxField";

const meta = {
  title: "Components/Inputs/CheckboxField",
  component: CheckboxField,
  args: {
    label: "Notify subscribers when status changes",
    description: "Send updates to watchers across the current workspace.",
    defaultChecked: true,
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CheckboxField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");
    await expect(checkbox).toBeChecked();
    await expect(canvas.getByText(/send updates to watchers/i)).toBeVisible();
    await userEvent.click(checkbox);
    await expect(checkbox).not.toBeChecked();
  },
};

export const ErrorState: Story = {
  args: {
    defaultChecked: false,
    errorText: "You must acknowledge notification ownership before saving.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");
    await expect(checkbox).not.toBeChecked();
    await expect(canvas.getByText(/you must acknowledge/i)).toBeVisible();
  },
};
