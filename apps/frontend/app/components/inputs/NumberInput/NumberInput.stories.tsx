import type { Meta, StoryObj } from '@storybook/react-vite';

import { NumberInput } from './NumberInput';

const meta = {
  title: 'Components/Inputs/NumberInput',
  component: NumberInput,
  args: {
    label: 'Story points',
    helperText: 'Estimate the effort for the selected task.',
    fullWidth: true,
    inputProps: {
      min: 1,
      max: 21,
    },
    defaultValue: 8,
  },
} satisfies Meta<typeof NumberInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};