import { Meta } from '@storybook/nextjs';

import { Default as TextCta } from '../../components/PageContent/TextCta';

export default {
  title: 'Components/PageContent/TextCta',
  component: TextCta,
} as Meta<typeof TextCta>;

export const Default = {
  args: {
    fields: {
      title: {
        value: 'PLAY! Summit Exclusive Offer',
      },
      subTitle: {
        value:
          'We’re partnering with over 2000 brands to offer PLAY! Summit attendees a 20% discount.',
      },
    },
    rendering: {
      componentName: 'Rendering',
      dataSource: '/AnythingForTheWithDatasourceCheckHocToDisplayTheComponent',
    },
  },
};
