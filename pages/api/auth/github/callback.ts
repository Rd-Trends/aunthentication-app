import nextConnect from "next-connect";

import passport from "../../../../lib/passportGithub";
import init from "../../../../middleware/init";

const handler = nextConnect();

handler.use(init).get(
  passport.authenticate("github", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
  })
);

export default handler;
