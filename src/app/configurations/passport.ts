import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import env from "./env";
import message, { MessageType } from "../utils/message";
import { User, Users } from "../modules/user/user.models";
import { userRoleStatusEnum } from "../modules/user/user.schemas";
import {
  AuthProviderDto,
  UserActivityStatusEnumDto,
} from "../modules/user/user.types";
import bcrypt from "bcryptjs";

const { google_client_id, google_client_secret, google_callback_url } = env;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },

    async (email: string, password: string, done) => {
      try {
        const user = (
          await Users.findOne({ email }).select("+password")
        )?.toObject() as User;
        if (!user) {
          return done(message("notFound", "user"));
        }
        if (
          ["BLOCKED", "INACTIVE"].includes(
            user.activityStatus as UserActivityStatusEnumDto
          )
        ) {
          return done(
            message(user.activityStatus?.toLowerCase() as MessageType, email)
          );
        }
        if (user.isDeleted) {
          return done(
            "This account has been deleted. Please create a new account or try again later."
          );
        }
        if (!user.isVerified) {
          return done(
            "This account has not been verified. Please verify your account or request a new verification link."
          );
        }
        const withoutCredential = user.auths.some(
          (provider: AuthProviderDto) => provider.provider !== "CREDENTIAL"
        );
        if (withoutCredential && !user.password) {
          return done(
            "Your account is currently signed in using a social login. If you want to sign in using your email and password, you first need to set a password for your account. Once the password is created, you can use your email and password to log in directly without using the social option."
          );
        }

        const isMatch = await bcrypt.compare(
          password as string,
          user.password as string
        );
        if (!isMatch) {
          return done(message("badRequest", "sign in"));
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: unusedProperty, ...rest } = user;
        return done(null, rest);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: google_client_id,
      clientSecret: google_client_secret,
      callbackURL: google_callback_url,
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const email = profile?.emails?.[0].value;

        if (!email) {
          return done(null, false, { message: message("notFound", "email") });
        }
        let user = (await Users.findOne({ email })) as User;

        if (
          ["BLOCKED", "INACTIVE"].includes(
            user.activityStatus as UserActivityStatusEnumDto
          )
        ) {
          return done(null, false, {
            message: message(
              user.activityStatus?.toLowerCase() as MessageType,
              email
            ),
          });
        }
        if (user.isDeleted) {
          return done(
            "This account has been deleted. Please create a new account or try again later."
          );
        }

        if (!user.isVerified) {
          return done(
            "This account has not been verified. Please verify your account or request a new verification link."
          );
        }
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
