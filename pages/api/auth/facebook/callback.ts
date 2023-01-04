import nextConnect from "next-connect";
import init from "../../../../middleware/init";
import passport from "../../../../lib/passportFacebook";
import { NextApiReq } from "../../../../interface";
import { NextApiResponse } from "next";

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
