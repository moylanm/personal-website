'use server'

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { compare } from 'bcryptjs';
import type { User } from '@/lib/definitions';

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

async function getUser(email: string): Promise<User | undefined> {
  try {
    type UserRow = {
      name: string;
      password_hash: Buffer;
    }

    const user = await sql<UserRow>`
      SELECT name, password_hash
      FROM users
      WHERE email=${email}
    `;

    if (!user.rows[0]) return undefined;

    const passwordHash = Buffer.from(user.rows[0].password_hash).toString();

    return {
      ...user.rows[0],
      email,
      passwordHash,
    } as User;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Database error:', error.message);
    }
    throw new Error('Failed to fetch user.');
  }
}

export const {
  handlers,
  auth,
  signIn,
  signOut
} = NextAuth({
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user && typeof token.email === 'string' && typeof token.name === 'string') {
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    }
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials === null) return null;

        try {
          const { email, password } = credentialsSchema.parse(credentials);
          const user = await getUser(email);

          if (!user) return null;

          const passwordsMatch = await compare(password, user.passwordHash);

          if (passwordsMatch) {
            return {
              email: user.email,
              name: user.name
            };
          }
        } catch (error) {
          console.error('Authorization error:', error);
        }

        return null;
      }
    })
  ]
});
