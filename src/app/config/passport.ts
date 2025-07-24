import passport from "passport";
import {
  Strategy as GoogleAuthStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import envVars from "./envvars.config";
import { User } from "../modules/user/user.model";
import { Role } from "../modules/user/user.interfaces";
import { Strategy as LocalStrategy } from "passport-local";
import bcryptjs from "bcryptjs";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email: string, password: string, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const googleAuthenticated = user.auths.some(
          (auth) => auth.provider === "google"
        );

        if (googleAuthenticated) {
          return done(null, false, {
            message: "User already authenticated with Google",
          });
        }

        const isValidPassword = await bcryptjs.compare(
          password,
          user.password as string
        );
        if (!isValidPassword) {
          return done(null, false, { message: "Invalid password" });
        }

        return done(null, user);
      } catch (error) {
        console.log(error);
        done(error);
      }
    }
  )
);

passport.use(
  new GoogleAuthStrategy(
    {
      clientID: envVars.GOOGLE_CLIENT_ID,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET,
      callbackURL: envVars.GOOGLE_CALLBACK_URL,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const email = profile.emails?.[0].value;
        if (!email) {
          return done(null, false, { message: "Email not found" });
        }
        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({
            email,
            name: profile.displayName,
            picture: profile.photos?.[0].value,
            role: Role.USER,
            isVerified: true,
            auths: [{ provider: "google", providerId: profile.id }],
          });
        }

        return done(null, user);
      } catch (error) {
        console.log(`Google strategy error`, error);
        return done(error);
      }
    }
  )
);

passport.serializeUser((user: any, done: VerifyCallback) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done: VerifyCallback) => {
  try {
    const user = await User.findById(id);
    done(null, user || false);
  } catch (error) {
    done(error);
  }
});
