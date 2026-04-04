import type { Meta, StoryObj } from "@storybook/react-vite";

import { AppButton } from "../Button/AppButton";
import { AppText } from "../Text/AppText";
import { Surface } from "./Surface";

const meta = {
  title: "Components/Surface",
  component: Surface,
  args: {
    accent: "primary",
    eyebrow: "Overview",
    title: "Release window",
    description:
      "Track deployment readiness, blockers, and operator actions in one place.",
    children: (
      <AppText variant="body1">
        The surface component gives the rest of the library a consistent frame
        with enough contrast for dense content.
      </AppText>
    ),
  },
} satisfies Meta<typeof Surface>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithActions: Story = {
  args: {
    actions: <AppButton tone="secondary">Inspect queue</AppButton>,
  },
};
