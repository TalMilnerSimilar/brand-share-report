import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from '../components/Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Component Library/Tooltip',
  component: Tooltip,
  argTypes: {
    content: { control: 'text' },
    position: {
      control: {
        type: 'select',
        options: ['top', 'bottom', 'left', 'right'],
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <button className="p-2 border rounded">Hover me</button>,
    position: 'top',
  },
};