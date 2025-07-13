import { compare } from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { PATHS } from '@/constants/paths';

import { prisma } from './prisma';

import * as authService from '@/services/auth';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.users.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) {
          return null;
        }

        const isValid = await compare(credentials.password as string, user.password);
        return isValid
          ? {
              id: user.id.toString(),
              email: user.email,
              name: user.name,
            }
          : null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) {
        return false;
      }

      const id = await authService.findOrCreateUserByOAuth(user, account);

      if (id) {
        user.id = id;
      }

      return true;
    },
    async redirect() {
      return '/';
    },
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.sub = user.id;
      }

      if (trigger === 'update') {
        token.name = session.name;
      }

      return token;
    },
  },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: PATHS.auth.signIn,
  },
};
