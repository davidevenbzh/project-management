import type { Meta, StoryObj } from "@storybook/react-vite";

import { AppList } from "./AppList";

const meta = {
  title: "Components/List",
  component: AppList,
  args: {
    title: "Recent events",
    description:
      "A short activity feed with clear primary and supporting content.",
    items: [
      {
        id: "1",
        primary: "Schema review approved",
        secondary:
          "Backend auth service is ready for the next environment promotion.",
        meta: "02m ago",
      },
      {
        id: "2",
        primary: "Three tickets reassigned",
        secondary: "Ops queue moved to the launch squad after triage.",
        meta: "19m ago",
      },
      {
        id: "3",
        primary: "Storybook build completed",
        secondary: "Component previews are available for design review.",
        meta: "51m ago",
      },
    ],
  },
} satisfies Meta<typeof AppList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
