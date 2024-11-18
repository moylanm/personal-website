export interface User {
	name: string;
	email: string;
	passwordHash: string;
}

export interface Excerpt {
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