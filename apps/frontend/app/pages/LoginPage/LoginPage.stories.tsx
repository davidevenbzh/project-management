import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import { expect, userEvent, within } from "storybook/test";

import { LoginPage } from "./LoginPage";

const meta = {
  title: "Pages/Login",
  component: LoginPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof LoginPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const email = canvas.getByRole("textbox", { name: /email address/i });
    const password = canvas.getByLabelText(/password/i);

    await userEvent.type(email, "owner@company.com");
    await userEvent.type(password, "hunter2");
    await expect(email).toHaveValue("owner@company.com");
    await expect(password).toHaveValue("hunter2");
    await expect(canvas.getByRole("link", { name: /forgot password/i })).toBeVisible();
    await expect(canvas.getByRole("link", { name: /create an account/i })).toBeVisible();
    await expect(canvas.getByRole("button", { name: /sign in/i })).toBeVisible();
  },
};
