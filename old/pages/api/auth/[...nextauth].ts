import { MoralisNextAuthProvider } from "@moralisweb3/next";
import NextAuth from "next-auth/next";

export default NextAuth({
  providers: [MoralisNextAuthProvider()],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
      }
      return token;
    },

    async session({ token, session }) {
      (session as { user: unknown }).user = token.name;
      return session;
    },
  },
});
