import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's email address. */
      email: string;
      name: string;
      image?: string;
      id?: string;
      provider?: string;
    };
  }
}
