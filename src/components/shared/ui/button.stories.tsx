import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

const defaultArgs = {
  isLoading: false,
  children: 'Button',
};

export const Default: Story = {
  args: {
    variant: 'default',
    ...defaultArgs,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    ...defaultArgs,
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    ...defaultArgs,
  },
};
