---
name: component-test
description: "Add Playwright browser tests to a Storybook story using play() functions. Use when: adding tests to a component, writing a play function, testing storybook stories, adding storybook test, playwright storybook integration, story interaction test, vitest browser test."
---

# Component Test

Add interaction tests to a Storybook story. Tests run as Playwright browser tests via `@storybook/addon-vitest` and Vitest's browser mode.

## Setup (already done in this repo)

- Vitest browser project wired in [`apps/frontend/vite.config.ts`](../../../apps/frontend/vite.config.ts) — `storybookTest` plugin + `playwright` provider + Chromium.
- Run: `pnpm --filter apps-frontend test` (headless) or `pnpm --filter apps-frontend test:ui` (interactive UI).
- Test utilities come from `storybook/test` (part of the `storybook` package — NOT `@storybook/test`).

## Procedure

### 1. Add the import to the story file

```tsx
import { expect, userEvent, within } from "storybook/test";
```

### 2. Add a `play` function to the story

```tsx
export const MyStory: Story = {
  args: { ... },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // assertions here
  },
};
```

### 3. Run the tests

```bash
pnpm --filter apps-frontend test
```

---

## Templates

### Display component (text, title, card)

```tsx
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText(/expected text/i)).toBeVisible();
  await expect(canvas.getByRole("heading", { name: /title/i })).toBeVisible();
},
```

### Button / interactive element

```tsx
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole("button", { name: /label/i });
  await expect(button).toBeVisible();
  await expect(button).not.toBeDisabled();
  await userEvent.click(button);
},
```

### Loading / disabled state

```tsx
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByRole("button")).toBeDisabled();
  await expect(canvas.getByRole("progressbar")).toBeVisible();
},
```

### Text input (`TextInput`, `NumberInput`, `DateInput`)

```tsx
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  // TextInput → "textbox", NumberInput → "spinbutton"
  const input = canvas.getByRole("textbox", { name: /label/i });
  await expect(input).toBeVisible();
  await userEvent.clear(input);
  await userEvent.type(input, "new value");
  await expect(input).toHaveValue("new value");
},
```

### Error state (any input)

```tsx
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const input = canvas.getByRole("textbox", { name: /label/i });
  await expect(input).toHaveAttribute("aria-invalid", "true");
  await expect(canvas.getByText(/error message text/i)).toBeVisible();
},
```

### Checkbox

```tsx
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const checkbox = canvas.getByRole("checkbox");
  await expect(checkbox).toBeChecked(); // or not.toBeChecked()
  await userEvent.click(checkbox);
  await expect(checkbox).not.toBeChecked();
},
```

### Radio group

```tsx
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const radios = canvas.getAllByRole("radio");
  await expect(radios).toHaveLength(2);
  await expect(canvas.getByRole("radio", { name: /option a/i })).toBeChecked();
  // MUI hides the <input type="radio"> with CSS — check labels for visibility
  await expect(canvas.getByText("Option A")).toBeVisible();
},
```

### Autocomplete / combobox

```tsx
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const combobox = canvas.getByRole("combobox", { name: /label/i });
  await expect(combobox).toBeVisible();
},
```

### Table

```tsx
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByRole("columnheader", { name: /column/i })).toBeVisible();
  // rows = data rows + 1 header row
  await expect(canvas.getAllByRole("row")).toHaveLength(expectedCount + 1);
},
```

### Container with data-status / data-\* attribute

```tsx
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const el = canvas.getByRole("article"); // or appropriate role
  await expect(el).toHaveAttribute("data-status", "expected-value");
},
```

---

## API Reference

| Import                                      | Purpose                                        |
| ------------------------------------------- | ---------------------------------------------- |
| `within(canvasElement)`                     | Scope queries to the story canvas              |
| `canvas.getByRole(role, { name })`          | Find element by ARIA role + accessible name    |
| `canvas.getByText(/pattern/i)`              | Find by visible text (regex, case-insensitive) |
| `canvas.getAllByRole(role)`                 | Get all matching elements (returns array)      |
| `userEvent.click(el)`                       | Simulate click                                 |
| `userEvent.type(el, "text")`                | Simulate typing                                |
| `userEvent.clear(el)`                       | Clear input value                              |
| `expect(el).toBeVisible()`                  | Assert element is visible                      |
| `expect(el).toBeDisabled()`                 | Assert element is disabled                     |
| `expect(el).toBeChecked()`                  | Assert checkbox/radio is checked               |
| `expect(el).toHaveValue(val)`               | Assert input value                             |
| `expect(el).toHaveClass("name")`            | Assert CSS class present                       |
| `expect(el).toHaveAttribute("attr", "val")` | Assert DOM attribute                           |

## Common ARIA roles

| Component type      | Role             |
| ------------------- | ---------------- |
| Button              | `"button"`       |
| Text input          | `"textbox"`      |
| Number input        | `"spinbutton"`   |
| Checkbox            | `"checkbox"`     |
| Radio               | `"radio"`        |
| Select/Autocomplete | `"combobox"`     |
| Table               | `"table"`        |
| Column header       | `"columnheader"` |
| Table row           | `"row"`          |
| Progress/spinner    | `"progressbar"`  |
| Heading             | `"heading"`      |
| List item           | `"listitem"`     |
