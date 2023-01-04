import nextConnect from "next-connect";
import init from "../../../../middleware/init";
import passport from "../../../../lib/passportGoogle";

const handler = nextConnect();

handler.use(init).get(
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
  })
);

export default handler;
