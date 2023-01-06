import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import dataURI from "datauri/parser";
import multer from "multer";
import { NextApiResponse } from "next";
import nextConnect from "next-connect";
import path from "path";

import { NextApiReq } from "../../../interface";
import init from "../../../middleware/init";
import User from "../../../models/userModel";

const dataUri = new dataURI();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const handler = nextConnect();

handler
  .use(init)
  .use(upload.single("photo"))
  .post(async (req: NextApiReq, res: NextApiResponse, next) => {
    try {
      const { name, email, bio, phone, password } = req.body;
      const { id } = req.query;
      let [user] = await User.find({ _id: id });
      let updatedPhoto = "";

      if (req.file) {
        const photo = dataUri.format(
          path.extname(req.file.originalname),
          req.file.buffer
        ).content;

        await cloudinary.uploader
          .upload(photo!, { folder: "authentication-app", public_id: name })
          .then(async (result) => {
            updatedPhoto = result.secure_url;
            user.photo = result.secure_url;
            await user.save();
          });
      }

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();
      }

      const update = { name, email, bio, phone };
      const updatedUser = await User.findByIdAndUpdate(id, update, {
        new: true,
      });

      req.session.passport.user = {
        ...req.session.passport.user,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        bio: updatedUser.bio,
        photo: updatedUser.photo,
      };
      return res.status(200).json(updatedUser);
    } catch (err) {
      return res.status(500);
    }
  });

export const config = {
  api: { bodyParser: false },
};

export default handler;
