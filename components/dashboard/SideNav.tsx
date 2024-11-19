'use client'

import {
	SideNavOuterBox,
	SideNavButton,
	SideNavInnerBox,
	SideNavSpacer,
	SignOutBox
} from '@/styles';
import { signOut } from 'next-auth/react';
import { PowerSettingsNewOutlined } from '@mui/icons-material'
import NavLinks from './NavLinks';

export function SideNav() {

	const handleSignOut = async () => {
		await signOut({
			redirectTo: '/'
		});
	};

	return (
		<SideNavOuterBox>
			<SideNavInnerBox>
				<NavLinks />
				<SideNavSpacer />
				<SideNavButton onClick={handleSignOut}>
					<PowerSettingsNewOutlined className='w-6' />
					<SignOutBox>Sign Out</SignOutBox>
				</SideNavButton>
			</SideNavInnerBox>
		</SideNavOuterBox>
	);
}
