export type User = {
	email: string;
	password_hash: Buffer;
}

export type Excerpt = {
	id?: string;
	author: string;
	work: string;
	body?: string;
	created_at?: string;
}
