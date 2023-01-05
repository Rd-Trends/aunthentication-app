import { NextApiResponse } from "next";
import nextConnect from "next-connect";

import { NextApiReq } from "../../../../interface";
import passport from "../../../../lib/passportTwitter";
import init from "../../../../middleware/init";

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
