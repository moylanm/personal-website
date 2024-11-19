import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { SideNav } from '@/components';
import {
  DashboardLayoutBox,
  DashboardLayoutChildrenBox,
  DashboardLayoutSideNavBox,
} from '@/styles';
import { Grid2 } from '@mui/material';
import StoreProvider from './StoreProvider';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) redirect('/');

  return (
    <Grid2 container spacing={4}>
      <Grid2 size={2}>
        <DashboardLayoutBox>
          <DashboardLayoutSideNavBox>
            <SideNav />
          </DashboardLayoutSideNavBox>
        </DashboardLayoutBox>
      </Grid2>
      <Grid2 size={10}>
        <DashboardLayoutChildrenBox>
          <StoreProvider>
            {children}
          </StoreProvider>
        </DashboardLayoutChildrenBox>
      </Grid2>
    </Grid2>
  );
}
