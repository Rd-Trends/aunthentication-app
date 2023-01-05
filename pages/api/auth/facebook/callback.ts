import { NextApiResponse } from "next";
import nextConnect from "next-connect";

import { NextApiReq } from "../../../../interface";
import passport from "../../../../lib/passportFacebook";
import init from "../../../../middleware/init";

const handler = nextConnect();

handler
  .use(init)
  .get(
    passport.authenticate("facebook", { failureRedirect: "/auth/login" }),
    (req: NextApiReq, res: NextApiResponse) => {
      res.status(200).redirect("/");
    }
  );

export default handler;
