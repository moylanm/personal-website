import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import {
	allExcerpts,
	latestExcerpts,
	excerptById,
	publishExcerptToDb,
	updateExcerptInDb,
	deleteExcerptFromDb
} from '@/lib/data';

async function checkAuth() {
	const session = await auth();

	if (!session) {
		return NextResponse.json(
			{ error: 'Unauthorized' },
			{ status: 401 }
		);
	}

	return session;
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get('id');
	const count = searchParams.get('count');

	try {
		if (id) {
			const data = await excerptById(id);
			return NextResponse.json(data);
		}

		if (count) {
			const data = await latestExcerpts(Number(count));
			return NextResponse.json(data);
		}

		const data = await allExcerpts();
		return NextResponse.json(data);
	} catch {
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

export async function POST(request: Request) {
	const session = await checkAuth();
	if (session instanceof NextResponse) return session;

	try {
		const {
			author,
			work,
			body
		} = await request.json();

		const data = await publishExcerptToDb({
			author,
			work,
			body
		});

		return NextResponse.json(data);
	} catch {
		return NextResponse.json({ error: 'Internal Server Error '}, { status: 500 });
	}
}

export async function PUT(request: Request) {
	const session = await checkAuth();
	if (session instanceof NextResponse) return session;

	try {
		const {
			id,
			author,
			work,
			body
		} = await request.json();
		
		await updateExcerptInDb({
			id,
			author,
			work,
			body
		});
		
		return NextResponse.json({ success: true });
	} catch {
		return NextResponse.json({ error: 'Internal Server Error '}, { status: 500 });
	}
}

export async function DELETE(request: Request) {
	const session = await checkAuth();
	if (session instanceof NextResponse) return session;

	const { searchParams } = new URL(request.url);
	const id = searchParams.get('id');
	
	try {
		if (id) {
			await deleteExcerptFromDb({ id });
			return NextResponse.json({ success: true });
		}

		return NextResponse.json({ success: false });
	} catch {
		return NextResponse.json({ error: 'Internal Server Error '}, { status: 500 });
	}
}
