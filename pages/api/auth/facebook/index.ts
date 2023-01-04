import nextConnect from "next-connect";
import init from "../../../../middleware/init";
import passport from "../../../../lib/passportFacebook";

const handler = nextConnect();

handler
  .use(init)
  .get(
    passport.authenticate("facebook", { scope: ["email", "public_profile"] })
  );

export default handler;
