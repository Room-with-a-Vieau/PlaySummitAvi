import { Meta } from '@storybook/nextjs';

import { Default as SessionsGrid } from '../../components/Sessions/SessionsGrid';
import { SESSIONS } from '../mock-sessions';

export default {
  title: 'Components/Sessions/SessionsGrid',
  component: SessionsGrid,
} as Meta<typeof SessionsGrid>;

export const Default = {
  args: {
    fields: {
      data: {
        item: {
          children: {
            results: SESSIONS,
          },
        },
      },
    },
  },
};
