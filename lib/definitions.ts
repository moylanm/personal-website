import { type DefaultSession } from 'next-auth';

export type User = {
	name: string;
	email: string;
	passwordHash: string;
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

declare module 'next-auth' {
  interface Session {
    user: {
      name: string
      email: string
    } & DefaultSession['user']
  }

  interface JWT {
    email: string
    name: string
  }
}