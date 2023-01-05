import nextConnect from "next-connect";

import passport from "../../../../lib/passportFacebook";
import init from "../../../../middleware/init";

const handler = nextConnect();

handler
  .use(init)
  .get(
    passport.authenticate("facebook", { scope: ["email", "public_profile"] })
  );

export default handler;
