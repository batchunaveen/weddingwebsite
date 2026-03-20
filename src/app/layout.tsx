import type { Metadata } from 'next';
import { Cormorant_Garamond, Great_Vibes, Inter, Geist } from 'next/font/google';
import './globals.scss';
import SmoothScroll from '@/components/SmoothScroll';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-great-vibes',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Naveen & Divya - A Cinematic Telugu Wedding Celebration',
  description: 'Join us into a timeless journey celebrating the beautiful union of Naveen and Divya through immersive chapters of our Telugu ceremonies.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${cormorant.variable} ${greatVibes.variable} ${inter.variable}`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
