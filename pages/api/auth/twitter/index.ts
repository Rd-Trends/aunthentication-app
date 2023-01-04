import nextConnect from "next-connect";
import init from "../../../../middleware/init";
import passport from "../../../../lib/passportTwitter";

const handler = nextConnect();

handler.use(init).get(passport.authenticate("twitter"));

export default handler;
