import nextConnect from "next-connect";
import init from "../../../../middleware/init";
import passport from "../../../../lib/passportGithub";

const handler = nextConnect();

handler
  .use(init)
  .get(passport.authenticate("github", { scope: ["user:email"] }));

export default handler;
