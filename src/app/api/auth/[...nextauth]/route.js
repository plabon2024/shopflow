import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: " " },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (!res.ok) {
          return null;
        }

        const user = await res.json();
        console.log("from auth", user);
        if (user) {
          return user;
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const userCollection = await dbConnect("users");
      const existingUser = await userCollection.findOne({
        email: user.email,
      });

      if (!existingUser) {
        await userCollection.insertOne({
          name: user.name,
          email: user.email,
          role: "user", // Default role
          image: user.image || "",
          createdAt: new Date(),
          isVerified: profile?.email_verified || false,
          status: "active",
          provider: account.provider,
        });
      } else {
        // Optionally update existing user with provider info
        await userCollection.updateOne(
          { email: user.email },
          {
            $set: {
              provider: account.provider,
              image: user.image || existingUser.image,
            },
          }
        );
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        // Fetch the full user object from the database for all providers
        const userCollection = await dbConnect("users");
        const fullUser = await userCollection.findOne({ email: user.email });

        if (fullUser) {
          // Remove sensitive fields like password, if present
          const { password, ...userWithoutPassword } = fullUser;
          token.user = userWithoutPassword;
        } else {
          // Fallback to minimal user data if not found in DB
          token.user = {
            name: user.name,
            email: user.email,
            image: user.image,
            role: "user",
            createdAt: new Date(),
            isVerified: account?.provider === "google" ? true : false,
            status: "active",
            provider: account?.provider || "credentials",
          };
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Assign the full user object to the session
      session.user = token.user;
      return session;
    },
  },
  async redirect({ url, baseUrl }) {
    return "/products";
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
