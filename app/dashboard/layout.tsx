import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { SideNav } from '@/components';
import {
  DashboardLayoutBox,
  DashboardLayoutChildrenBox,
  DashboardLayoutSideNavBox,
} from '@/styles';
import { Grid2 } from '@mui/material';
import { StoreProvider } from '@/components';
import { AuthErrorBoundary } from '@/components';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) redirect('/');

  return (
    <AuthErrorBoundary>
      <StoreProvider>
        <Grid2 container direction={{ xs: 'column', md: 'row' }}>
          <Grid2 size={{ xs: 12, md: 2 }}>
            <DashboardLayoutBox>
              <DashboardLayoutSideNavBox>
                <SideNav />
              </DashboardLayoutSideNavBox>
            </DashboardLayoutBox>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 10 }}>
            <DashboardLayoutChildrenBox>
              {children}
            </DashboardLayoutChildrenBox>
          </Grid2>
        </Grid2>
      </StoreProvider>
    </AuthErrorBoundary>
  );
}
