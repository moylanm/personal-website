import {
	SideNavOuterBox,
	SideNavButton,
	SideNavInnerBox,
	SideNavSpacer,
	SignOutBox
} from '../style';
import { signOut } from '@/auth';
import { PowerSettingsNewOutlined } from '@mui/icons-material'
import NavLinks from './NavLinks';

export default function SideNav() {
	return (
		<SideNavOuterBox>
			<SideNavInnerBox>
				<NavLinks />
				<SideNavSpacer />
				<form action={async () => {
					'use server';
					await signOut();
				}}>
					<SideNavButton type='submit'>
						<PowerSettingsNewOutlined className='w-6' />
						<SignOutBox>Sign Out</SignOutBox>
					</SideNavButton>
				</form>
			</SideNavInnerBox>
		</SideNavOuterBox>
	);
}
