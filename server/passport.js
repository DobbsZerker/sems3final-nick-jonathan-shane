const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

const GOOGLE_CLIENT_ID =
  "399785532610-7r3f3jdd1p5prsksabqqvu7ofaisafo8.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
