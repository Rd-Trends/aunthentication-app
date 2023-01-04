import nextConnect from "next-connect";
import init from "../../../../middleware/init";
import passport from "../../../../lib/passportGoogle";

const handler = nextConnect();

handler
  .use(init)
  .get(passport.authenticate("google", { scope: ["email", "profile"] }));

export default handler;
