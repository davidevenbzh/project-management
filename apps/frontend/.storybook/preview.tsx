import "../app/app.css";

import React from "react";
import type { Preview } from "@storybook/react-vite";

import { AppThemeProvider } from "../app/theme/AppThemeProvider";

const preview: Preview = {
  globalTypes: {
    themeMode: {
      name: "Theme mode",
      defaultValue: "dark",
      toolbar: {
        icon: "mirror",
        items: [
          { value: "dark", title: "Dark" },
          { value: "light", title: "Light" },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const mode = context.globals.themeMode === "light" ? "light" : "dark";
      return (
        <div className="storybook-shell">
          <div className="theme-root data-theme">
            <AppThemeProvider mode={mode}>
              <div className="storybook-frame">
                <Story />
              </div>
            </AppThemeProvider>
          </div>
        </div>
      );
    },
  ],
  parameters: {
    layout: "fullscreen",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
