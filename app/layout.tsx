import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { merriweather } from './ui/fonts';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { SessionProvider } from 'next-auth/react';
import theme from './ui/theme';
import Navbar from './ui/main/Navbar';
import Footer from './ui/main/Footer';

export const metadata: Metadata = {
  title: {
    template: '%s | mylesmoylan.net',
    default: 'mylesmoylan.net',
  },
  description: 'The personal website of Myles Moylan - Exploring philosophy, psychology, religion, and literature',
  creator: 'Myles Moylan',
  keywords: [
    'philosophy',
    'psychology',
    'religion',
    'mythology',
    'existentialism',
    'transcendentalism',
    'Buddhism',
    'literature',
  ],
  metadataBase: new URL('https://mylesmoylan.net'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mylesmoylan.net',
    siteName: 'mylesmoylan.net',
    title: 'mylesmoylan.net',
    description: 'The personal website of Myles Moylan - Exploring philosophy, psychology, religion, and literature',
    images: [
      {
        url: '/og-image-home.png',
        width: 1200,
        height: 630,
        alt: 'mylesmoylan.net - Personal Website'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'mylesmoylan.net',
    description: 'The personal website of Myles Moylan - Exploring philosophy, psychology, religion, and literature',
    images: ['/og-image-home.png'],
  },
  alternates: {
    canonical: 'https://mylesmoylan.net'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${merriweather.className} antialiased`} >
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <SessionProvider>
                <Navbar />
                <main>
                  {children}
                </main>
              </SessionProvider>
              <Footer />
            </ThemeProvider>
          </AppRouterCacheProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}