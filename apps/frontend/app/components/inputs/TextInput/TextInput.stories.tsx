import type { Meta, StoryObj } from "@storybook/react-vite";

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
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ErrorState: Story = {
  args: {
    defaultValue: "Release?",
    errorText: "Avoid punctuation in the canonical name.",
  },
};
