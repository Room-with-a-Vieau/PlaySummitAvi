import { Meta } from '@storybook/nextjs';

import { Default as Facebook } from '../../components/Channels/Facebook';

export default {
  title: 'Components/Channels/Facebook',
  component: Facebook,
} as Meta<typeof Facebook>;

export const Default = {
  args: {
    rendering: {
      componentName: 'Rendering',
      dataSource: '/AnythingForTheWithDatasourceCheckHocToDisplayTheComponent',
    },
  },
};
