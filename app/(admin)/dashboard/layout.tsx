import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import SideNav from '@/app/ui/dashboard/SideNav';
import {
  DashboardLayoutBox,
  DashboardLayoutChildrenBox,
  DashboardLayoutSideNavBox,
} from '@/app/ui/style';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) redirect('/');

  return (
    <>
      <DashboardLayoutBox>
        <DashboardLayoutSideNavBox>
          <SideNav />
        </DashboardLayoutSideNavBox>
      </DashboardLayoutBox>
      <DashboardLayoutChildrenBox>
        {children}
      </DashboardLayoutChildrenBox>
    </>
  );
}
