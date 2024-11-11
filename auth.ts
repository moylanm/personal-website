'user server'

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { compare } from 'bcryptjs';
import type { User } from '@/lib/definitions';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql`
      SELECT id, name, email, password_hash
      FROM users
      WHERE email=${email}
    `;

    if (!user.rows[0]) return undefined;

    const passwordHash = Buffer.from(user.rows[0].password_hash).toString();

    return {
      ...user.rows[0],
      passwordHash,
    } as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials === null) return null;

        const parsedCredentials = z.object({
          email: z.string().email(),
          password: z.string().min(6)
        }).safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);

          if (!user) return null;

          const passwordsMatch = await compare(password, user.passwordHash);

          if (passwordsMatch) return user;
        }

        return null;
      }
    })
  ]
});
