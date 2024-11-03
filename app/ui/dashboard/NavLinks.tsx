'use client'

import { PostAddOutlined, EditOutlined } from '@mui/icons-material'
import Link from 'next/link';
import { NavLink, SideNavButton } from '../style';

const LINKS = [
	{
		name: 'Publish',
		href: '/dashboard/publish',
		icon: PostAddOutlined
	},
	{
		name: 'Edit',
		href: '/dashboard/edit',
		icon: EditOutlined
	},
];

export default function NavLinks() {
	return (
		<>
			{LINKS.map((link) => {
				const LinkIcon = link.icon;
				return (
					<NavLink
						component={Link}
						key={link.name}
						href={link.href}
					>
						<SideNavButton>
							<LinkIcon className='h-6 w-6' />
							<p className='hidden md:block'>{link.name}</p>
						</SideNavButton>
					</NavLink>
				);
			})}
		</>
	);
}
