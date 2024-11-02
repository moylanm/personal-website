import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
	const session = await auth();

	if (!session?.user) redirect('/');
	
	return (
		<>
			<div>{session.user.email}</div>
			<div>{session.user.name}</div>
		</>
	);
}
