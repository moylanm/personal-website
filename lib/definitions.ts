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

export enum APIStatus {
	Idle = 'IDLE',
	Pending = 'PENDING',
	Rejected = 'REJECTED',
	Fulfilled = 'FULFILLED'
}