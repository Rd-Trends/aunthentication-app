import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import { NextApiReq } from "../../../interface";
import init from "../../../middleware/init";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import dataURI from "datauri/parser";
import User from "../../../models/userModel";
import bcrypt from "bcrypt";

const dataUri = new dataURI();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const handler = nextConnect();

handler
  .use(init)
  .use(upload.single("photo"))
  .post(async (req: NextApiReq, res: NextApiResponse, next) => {
    const { name, email, bio, phone, password } = req.body;
    const { id } = req.query;
    let [user] = await User.find({ _id: id });

    if (req.file) {
      const photo = dataUri.format(
        path.extname(req.file.originalname),
        req.file.buffer
      ).content;
      cloudinary.uploader
        .upload(photo!, { folder: "authentication-app", public_id: name })
        .then(async (result) => {
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
    const updatedUser = await User.findByIdAndUpdate(id, update, { new: true });

    req.session.passport.user = {
      ...req.session.passport.user,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      bio: updatedUser.bio,
      photo: updatedUser.photo,
    };
    return res.status(200).json(updatedUser);
  });

export const config = {
  api: { bodyParser: false },
};

export default handler;
