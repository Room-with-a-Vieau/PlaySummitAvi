import type { Metadata } from 'next';
import { Default as Google } from 'components/Channels/Google';

export const metadata: Metadata = {
  title: 'Google',
  icons: { icon: '/assets/img/channels/google.ico' },
};

export default function GooglePage() {
  return <Google />;
}
