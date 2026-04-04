import type { Meta, StoryObj } from '@storybook/react-vite';

import { ComponentShowcase } from './ComponentShowcase';

const meta = {
  title: 'Components/Showcase',
  component: ComponentShowcase,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ComponentShowcase>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {};