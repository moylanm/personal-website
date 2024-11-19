'use client'

import { HomeOutlined, PostAddOutlined, EditOutlined} from '@mui/icons-material'
import Link from 'next/link';
import { NavLink, SideNavButton } from '@/styles';
import { usePathname } from 'next/navigation';

const LINKS = [
	{
		name: 'Home',
		href: '/dashboard',
		icon: HomeOutlined
	},
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
	const pathname = usePathname();

	return (
		<>
			{LINKS.map((link) => {
				const LinkIcon = link.icon;
				return (
					<NavLink
						component={Link}
						key={link.name}
						href={link.href}
						style={ pathname === link.href ? { backgroundColor: '#282828' } : {} }
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
