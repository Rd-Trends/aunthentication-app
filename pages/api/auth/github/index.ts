import nextConnect from "next-connect";

import passport from "../../../../lib/passportGithub";
import init from "../../../../middleware/init";

const handler = nextConnect();

handler
  .use(init)
  .get(passport.authenticate("github", { scope: ["user:email"] }));

export default handler;
