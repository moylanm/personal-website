export type User = {
	id: string;
	name: string;
	email: string;
	passwordHash: Buffer;
}

export type Excerpt = {
	id: string;
	author: string;
	work: string;
	body: string;
	createdAt: string;
}

export type SessionPayload = {
	userId: string;
	expiresAt: Date;
}
