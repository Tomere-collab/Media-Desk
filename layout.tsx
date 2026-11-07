import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BFAF Media Accreditation',
  description: 'Media accreditation applications for Bayelsa Food & Art Festival.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}