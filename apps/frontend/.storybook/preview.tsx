import "../app/app.css";
import type { Preview } from "@storybook/react-vite";
import React from "react";

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

      return React.createElement(
        "div",
        { className: "storybook-shell" },
        React.createElement(
          "div",
          { className: "theme-root", "data-theme": mode },
          React.createElement(
            AppThemeProvider,
            { mode },
            React.createElement(
              "div",
              { className: "storybook-frame" },
              React.createElement(Story),
            ),
          ),
        ),
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
