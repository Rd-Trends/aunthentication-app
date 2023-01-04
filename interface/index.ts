import { NextApiRequest } from "next";

export interface user {
  name: string;
  email: string;
  _id: string;
  photo: string;
  bio: string;
  phone: string;
}

export interface NextApiReq extends NextApiRequest {
  user: user;
  login: (user: user, callback: (err: Error) => any) => void;
  logout: (callBack: (err: Error) => void) => void;
  [x: string]: any;
}
