export type User = {
	email: string;
	password_hash: string;
}

export type Excerpt = {
	id: string;
	author: string;
	work: string;
	body: string;
	createdAt?: string;
}
