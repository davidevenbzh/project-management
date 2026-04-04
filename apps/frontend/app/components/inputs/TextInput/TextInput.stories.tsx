import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { TextInput } from "./TextInput";

const meta = {
  title: "Components/Inputs/TextInput",
  component: TextInput,
  args: {
    label: "Project name",
    placeholder: "Enter project label",
    helperText: "Use a short, recognizable identifier.",
    fullWidth: true,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: /project name/i });
    await expect(input).toBeVisible();
    await expect(canvas.getByText(/use a short, recognizable identifier/i)).toBeVisible();
    await userEvent.type(input, "auth-service");
    await expect(input).toHaveValue("auth-service");
  },
};

export const ErrorState: Story = {
  args: {
    defaultValue: "Release?",
    errorText: "Avoid punctuation in the canonical name.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: /project name/i });
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(canvas.getByText(/avoid punctuation/i)).toBeVisible();
  },
};
