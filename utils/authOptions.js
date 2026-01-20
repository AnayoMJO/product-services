import connectDb from "../config/db";
import User from "../models/user";
import Google from "next-auth/providers/google";
import NextAuth from "next-auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    //invoked whenever a user signs in successfully
    async signIn({ profile }) {
      // connect to db
      await connectDb();
      // check if user exists
      const userExist = await User.findOne({ email: profile.email });
      //if not create user
      if (!userExist) {
        // truncate user name if too long
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username,
          image: profile.image,
        });
      }
      //return true to sign in the user;
      return true;
    },
    //modify session object
    async session({ session }) {
      // get user from db
      const user = await User.findOne({ email: session.user.email });
      // assign user to session.user
      session.user.id = user._id.toString();
      // return session
      return session;
    },
  },
});
