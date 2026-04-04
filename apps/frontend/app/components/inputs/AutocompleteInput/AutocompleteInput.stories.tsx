import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { AutocompleteInput } from "./AutocompleteInput";

const options = [
  {
    label: "Design systems",
    value: "design",
    description: "Visual patterns, tokens, and shared components.",
  },
  {
    label: "Platform",
    value: "platform",
    description: "Infra, auth, and service ownership.",
  },
  {
    label: "Growth",
    value: "growth",
    description: "Activation funnels and engagement metrics.",
  },
  {
    label: "Support",
    value: "support",
    description: "Inbox health and response-time coverage.",
  },
];

const meta = {
  title: "Components/Inputs/AutocompleteInput",
  component: AutocompleteInput,
  tags: ['autodocs'],
  args: {
    label: "Assign team",
    helperText: "Search a local option set or show an async loading state.",
    options,
  },
} satisfies Meta<typeof AutocompleteInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const combobox = canvas.getByRole("combobox", { name: /assign team/i });
    await expect(combobox).toBeVisible();
    await expect(combobox).not.toBeDisabled();
    await expect(canvas.getByText(/search a local option set/i)).toBeVisible();
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    options: [],
    helperText: "Remote search is warming up.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const combobox = canvas.getByRole("combobox", { name: /assign team/i });
    await expect(combobox).toBeVisible();
    await expect(canvas.getByText(/remote search is warming up/i)).toBeVisible();
  },
};
