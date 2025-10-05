import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/Navbar';

export const metadata: Metadata = {
  title: 'Terra Rupertus | NASA Earth Data Visualization',
  description: 'Follow Rupert the armadillo as he explores 25 years of NASA Terra satellite data showing global environmental changes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

