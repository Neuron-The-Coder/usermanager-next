import DOMPurify from "isomorphic-dompurify";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../database/database";

export default async function updateUser (
  req : NextApiRequest,
  res : NextApiResponse
) {

  if (req.method == "POST"){

    const { email, username, ID } = req.body;

    await prisma.user.update({
      data : {
        Email : DOMPurify.sanitize(email),
        Username : DOMPurify.sanitize(username)
      },
      where : {
        ID : ID
      }
    });

    res.status(200).json({
      message : "Success"
    });
  }

  else res.status(405).json({ message : "Bad Request"});
}
