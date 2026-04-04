import type { Meta, StoryObj } from "@storybook/react-vite";

import { CheckboxField } from "./CheckboxField";

const meta = {
  title: "Components/Inputs/CheckboxField",
  component: CheckboxField,
  args: {
    label: "Notify subscribers when status changes",
    description: "Send updates to watchers across the current workspace.",
    defaultChecked: true,
  },
} satisfies Meta<typeof CheckboxField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ErrorState: Story = {
  args: {
    defaultChecked: false,
    errorText: "You must acknowledge notification ownership before saving.",
  },
};
