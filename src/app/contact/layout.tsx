import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | AssuredPartners',
  description:
    'Get in touch with AssuredPartners for questions about our home warranty plans or assistance.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
