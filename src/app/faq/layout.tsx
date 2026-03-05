import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ | AssuredPartners',
  description:
    'Frequently asked questions about AssuredPartners home warranty plans and coverage.',
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
