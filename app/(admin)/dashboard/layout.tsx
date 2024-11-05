import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import SideNav from '@/app/ui/dashboard/SideNav';
import {
  DashboardLayoutBox,
  DashboardLayoutChildrenBox,
  DashboardLayoutSideNavBox,
} from '@/app/ui/style';
import { Grid2 } from '@mui/material';
import StoreProvider from './StoreProvider';
import { allExcerpts } from '@/app/lib/data';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) redirect('/');

  const excerpts = await allExcerpts();

  return (
    <>
        <Grid2 container>
          <Grid2 size={2}>
            <DashboardLayoutBox>
              <DashboardLayoutSideNavBox>
                <SideNav />
              </DashboardLayoutSideNavBox>
            </DashboardLayoutBox>
          </Grid2>
          <Grid2 size={6}>
            <DashboardLayoutChildrenBox>
              <StoreProvider excerpts={excerpts}>
                {children}
              </StoreProvider>
            </DashboardLayoutChildrenBox>
          </Grid2>
        </Grid2>
    </>
  );
}
