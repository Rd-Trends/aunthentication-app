import { Schema, model, models } from "mongoose";
import { string } from "yup";

interface IUser {
  name?: string;
  email?: string;
  bio?: string;
  phone?: string;
  password?: string | number;
  photo?: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, default: "" },
  email: { type: String, default: "" },
  bio: { type: String, default: "" },
  phone: { type: String, default: "" },
  password: { type: String || Number },
  photo: { type: String, default: "" },
});

const User = models.User || model<IUser>("User", userSchema);

export default User;
