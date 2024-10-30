import type { Metadata } from 'next';
import { merriweather } from './_ui/fonts';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from './_ui/theme';
import Navbar from './_ui/_components/Navbar';
import { CssBaseline } from '@mui/material';
import Footer from './_ui/_components/Footer';

export const metadata: Metadata = {
  title: "mylesmoylan.net",
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
      </body>
    </html>
  );
}
