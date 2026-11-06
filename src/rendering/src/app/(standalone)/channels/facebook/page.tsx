import type { Metadata } from 'next';
import { Default as Facebook } from 'components/Channels/Facebook';

export const metadata: Metadata = {
  title: 'Facebook',
  icons: { icon: '/assets/img/channels/facebook.ico' },
};

export default function FacebookPage() {
  return <Facebook />;
}
