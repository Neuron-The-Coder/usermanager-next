import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../database/database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface IAuthOutput {
  token : string
}

export default async function auth(
  req : NextApiRequest,
  res : NextApiResponse
){

  if (req.method == "POST"){
    const secret = process.env.JWT_SECRET ?? ""
    const { email, password } = req.body;

    const result = await prisma.user.findFirst({
      where : {
        Email : email
      }
    });

    if (result == null) {
      res.status(400).json({ message : "Invalid email or pass" });
    }

    const isValidPass = await bcrypt.compare(password, (result == null) ? "" : result.Password);
    if (!isValidPass) res.status(400).json({ message : "Invalid email or pass" });

    else{
      let token = jwt.sign({
        UserID : (result == null) ? 0 : result.ID
      }, secret, {
        expiresIn : 3600, // 1 hour
      });

      res.status(200).json({ token : token });
    } 
  }

  else res.status(405).json({ message : "Not Allowed" });
}