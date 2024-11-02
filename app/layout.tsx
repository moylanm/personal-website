import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { merriweather } from './ui/fonts';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './ui/theme';
import Navbar from './ui/main/Navbar';
import Footer from './ui/main/Footer';

export const metadata: Metadata = {
  title: {
    template: '%s | mylesmoylan.net',
    default: 'mylesmoylan.net',
  },
  description: 'The personal website of Myles Moylan',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${merriweather.className} antialiased`} >
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <main>
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
