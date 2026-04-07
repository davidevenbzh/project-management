import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import { expect, userEvent, within } from "storybook/test";

import { ForgotPasswordPage } from "./ForgotPasswordPage";

const meta = {
  title: "Pages/Forgot Password",
  component: ForgotPasswordPage,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/forgot-password"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof ForgotPasswordPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const email = canvas.getByRole("textbox", { name: /email address/i });

    await userEvent.type(email, "owner@company.com");
    await expect(email).toHaveValue("owner@company.com");
    await expect(canvas.getByRole("button", { name: /send reset link/i })).toBeVisible();
    await expect(canvas.getByRole("link", { name: /back to login/i })).toBeVisible();
    await expect(canvas.getByRole("link", { name: /create an account/i })).toBeVisible();
  },
};
