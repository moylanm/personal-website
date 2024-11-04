import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import StoreProvider from './StoreProvider';
import SideNav from '@/app/ui/dashboard/SideNav';
import {
  DashboardLayoutBox,
  DashboardLayoutChildrenBox,
  DashboardLayoutSideNavBox,
} from '@/app/ui/style';
import { Grid2 } from '@mui/material';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) redirect('/');

  return (
    <>
      <StoreProvider>
        <Grid2 container>
          <Grid2 size={2}>
            <DashboardLayoutBox>
              <DashboardLayoutSideNavBox>
                <SideNav />
              </DashboardLayoutSideNavBox>
            </DashboardLayoutBox>
          </Grid2>
          <Grid2>
            <DashboardLayoutChildrenBox>
              {children}
            </DashboardLayoutChildrenBox>
          </Grid2>
        </Grid2>
      </StoreProvider>
    </>
  );
}
