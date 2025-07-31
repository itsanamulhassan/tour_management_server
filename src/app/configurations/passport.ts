import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import env from "./env";
import message from "../utils/message";
import { Users } from "../modules/user/user.model";
import { userRoleStatusEnum } from "../modules/user/user.schema";

const { google_client_id, google_client_secret, google_callback_url } = env;

passport.use(
  new GoogleStrategy(
    {
      clientID: google_client_id,
      clientSecret: google_client_secret,
      callbackURL: google_callback_url,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const email = profile?.emails?.[0].value;
        if (!email) {
          return done(null, false, { message: message("notFound", "email") });
        }
        let user = await Users.findOne({ email });
        if (!user) {
          user = await Users.create({
            email,
            name: profile.displayName,
            avatar: profile.photos?.[0].value,
            role: userRoleStatusEnum[0],
            isVerified: true,
            auths: [{ provider: "GOOGLE", providerId: profile.id }],
          });
        }
        return done(null, user);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log("Google strategy error, ", error);
        return done(error);
      }
    }
  )
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
  done(null, user._id);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = await Users.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
