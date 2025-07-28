// 📁 pages/api/auth/[...nextauth].ts

import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Email et mot de passe',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email et mot de passe requis');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error('Utilisateur non trouvé');
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error('Mot de passe incorrect');
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name ?? '', // 🔧 éviter crash si `name` est null
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user = {
          ...session.user,
          id: token.sub || '',
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id?.toString();
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login', // 🔧 rediriger vers /login en cas d'erreur
  },
  debug: true, // 🔍 utile pour voir les logs sur Vercel
};

export default NextAuth(authOptions);
