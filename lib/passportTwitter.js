import passport from "passport";
import { Strategy as TwitterStrategy } from "passport-twitter";

import { server } from "../config";
import User from "../models/userModel";

passport.serializeUser(function (user, done) {
  // serialize the username into session
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env["TWITTER_API_KEY"],
      consumerSecret: process.env["TWITTER_API_SECRET"],
      callbackURL: `${server}/api/auth/twitter/callback`,
      includeEmail: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        if (!email) {
          return done(null, null, {
            message: "no email address is registered with this account",
          });
        }
        const userExists = await User.findOne({ email });

        if (userExists) {
          const { email, name, _id, photo, bio, phone } = userExists;
          return done(null, { email, name, _id, photo, bio, phone });
        }

        // if user doesn't exists, create a new user
        const user = new User({
          name: profile.displayName ?? "",
          email: profile.emails[0].value ?? "",
          photo: profile.photos[0].value ?? "",
          bio: profile._json.description ?? "",
        });

        await user.save();
        return done(null, {
          name: user.name,
          email: user.email,
          bio: user.bio,
          _id: user._id,
          photo: user.photo,
          phone: user.phone,
        });
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

export default passport;
