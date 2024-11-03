import SideNav from '@/app/ui/dashboard/SideNav';
import {
  DashboardLayoutBox,
  DashboardLayoutChildrenBox,
  DashboardLayoutSideNavBox,
} from '@/app/ui/style';

export default function Layout({ children }: { children: React.ReactNode }) {
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
