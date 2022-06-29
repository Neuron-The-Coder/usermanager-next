import { User } from "@prisma/client";
import DOMPurify from "isomorphic-dompurify";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../database/database";

export default async function addUser(
  req : NextApiRequest,
  res : NextApiResponse
){

  if (req.method == "POST"){
    const { email, username } = req.body;
  
    const newUser : User = await prisma.user.create({
      data : {
        Email : DOMPurify.sanitize(email),
        Username : DOMPurify.sanitize(username),
        Password : "$2a$12$Oi9MiEqEx37Oo9TfuPgJzedeH1iqGhFYDE6Leuhq/PK9.0fNJOg8C",
      }
    });
  
    res.status(200).json({
      message : "Success",
      data : newUser.ID
    });
  }

  else res.status(405).json({ message : "Bad Request"});
}