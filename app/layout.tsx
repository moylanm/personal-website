import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { merriweather } from '@/styles/fonts';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { SessionProvider } from 'next-auth/react';
import theme from '@/styles/theme';
import { Navbar, Footer } from '@/components';

export const metadata: Metadata = {
  title: {
    template: '%s | mylesmoylan.net',
    default: 'mylesmoylan.net',
  },
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
    siteName: 'mylesmoylan.net',
  },
  twitter: {
    card: 'summary_large_image',
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