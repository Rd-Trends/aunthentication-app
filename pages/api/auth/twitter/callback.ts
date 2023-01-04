import nextConnect from "next-connect";
import init from "../../../../middleware/init";
import passport from "../../../../lib/passportTwitter";
import { NextApiReq } from "../../../../interface";
import { NextApiResponse } from "next";

const handler = nextConnect();

handler.use(init).get(
  passport.authenticate("twitter", {
    failureRedirect: "/auth/login",
    scope: ["tweet.read", "tweet.write", "users.read"],
    failureMessage: true
  }),
  (req: NextApiReq, res: NextApiResponse) => {
    res.redirect("/");
  }
);

export default handler;
