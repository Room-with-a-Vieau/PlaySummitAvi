import type { Metadata } from 'next';
import { Default as Linkedin } from 'components/Channels/Linkedin';

export const metadata: Metadata = {
  title: 'LinkedIn',
  icons: { icon: '/assets/img/channels/linkedin.ico' },
};

export default function LinkedinPage() {
  return <Linkedin />;
}
