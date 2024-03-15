import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { AuthOptions, DefaultSession, getServerSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { unstable_noStore } from "next/cache";
import { SiweMessage } from "siwe";

declare module "next-auth" {
  interface Session extends DefaultSession {
    address: string;
    user: { id: string } & DefaultSession["user"];
  }
}

export const authConfig = {
  pages: {
    signIn: "/",
  },

  providers: [
    Credentials({
      name: "nft-market-eth",
      credentials: {
        message: {
          type: "text",
          label: "message",
          placeholder: "0x0",
        },
        signature: {
          type: "text",
          label: "credentials",
          placeholder: "0x0",
        },
      },
      authorize: async (credentials, req) => {
        try {
          const siwe = new SiweMessage(
            JSON.parse(credentials?.message || "{}")
          );
          const nextAuthURL = new URL(process.env.NEXTAUTH_URL!);

          const result = await siwe.verify({
            signature: credentials?.signature || "",
            domain: nextAuthURL.host,
            nonce: await getCsrfToken({ req: { headers: req.headers } }),
          });
          if (result.success) {
            return {
              id: siwe.address,
            };
          }
          return null;
        } catch (error) {
          console.log({ error });
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.address = token.sub || "";
        session.user.name = token.sub;
      }
      return session;
    },
  },
} satisfies AuthOptions;

export async function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  unstable_noStore();
  const session = await getServerSession(...args, authConfig);
  return {
    getUser: () => session?.user && { userId: session.user.id },
    user: session?.user,
  };
}
