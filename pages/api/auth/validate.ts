import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function validate(
  req : NextApiRequest,
  res : NextApiResponse
){

  const secret = process.env.JWT_SECRET ?? "";

  if (req.method == "POST"){
    const authorization = req.headers.authorization || "";

    if (authorization == "") res.status(403).json({ message : "Unauthorized" })

    const token = authorization.split(" ", 2)[1];
    const result = jwt.verify(token, secret);

    if (result) res.status(200).json({ message : "Verified" });
    else res.status(403).json({ message : "Unauthorized" });
  }

  else res.status(405).json({ message : "Not Allowed" });
}