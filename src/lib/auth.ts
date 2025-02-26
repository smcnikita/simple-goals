import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import { compare } from 'bcryptjs';

import { prisma } from './prisma';

type GithubEmail = {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.users.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) return null;

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
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: { params: { scope: 'user:email' } },
      profile: async (profile, tokens) => {
        const res = await fetch('https://api.github.com/user/emails', {
          headers: { Authorization: `token ${tokens.access_token}` },
        });
        const emails = await res.json();
        const primaryEmail = emails.find((e: GithubEmail) => e.primary)?.email;

        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: primaryEmail || profile.email,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'github') {
        if (!user.email) return false;

        const existingUser = await prisma.users.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) return false;
        user.id = existingUser.id.toString();
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Если URL является внутренним, перенаправляем на него
      if (url.startsWith(baseUrl)) return url;

      // Проверяем URL на основе разных OAuth провайдеров
      if (url.includes('github')) return '/oauth/callback/github';

      // По умолчанию отправляем на главную
      return '/';
    },
    async session({ session, token }) {
      if (token.sub) session.user.id = token.sub;
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.sub = user.id;
      return token;
    },
  },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in', // Укажите страницу входа, если нужно
  },
};
