import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import { expect, userEvent, within } from "storybook/test";

import { RegistrationPage } from "./RegistrationPage";

const meta = {
  title: "Pages/Registration",
  component: RegistrationPage,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/registration"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof RegistrationPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const name = canvas.getByRole("textbox", { name: /full name/i });
    const email = canvas.getByRole("textbox", { name: /email address/i });
    const password = canvas.getByLabelText(/password/i);

    await userEvent.type(name, "Alex Johnson");
    await userEvent.type(email, "alex@company.com");
    await userEvent.type(password, "sprint-board");
    await expect(name).toHaveValue("Alex Johnson");
    await expect(email).toHaveValue("alex@company.com");
    await expect(password).toHaveValue("sprint-board");
    await expect(canvas.getByRole("button", { name: /create account/i })).toBeVisible();
    await expect(canvas.getByRole("link", { name: /back to login/i })).toBeVisible();
  },
};
