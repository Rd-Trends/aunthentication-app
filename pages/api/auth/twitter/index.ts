import nextConnect from "next-connect";

import passport from "../../../../lib/passportTwitter";
import init from "../../../../middleware/init";

const handler = nextConnect();

handler.use(init).get(passport.authenticate("twitter"));

export default handler;
