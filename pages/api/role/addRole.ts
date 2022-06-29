import DOMPurify from "isomorphic-dompurify";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../database/database";

export default async function addRole(
  req : NextApiRequest,
  res : NextApiResponse
) {

  if (req.method == "POST"){
    const { name } = req.body;

    const duplicate = await prisma.role.findFirst({
      where : {
        Name : name
      }
    });

    if (duplicate !== null) res.status(400).json({ message : "Name already exists" });
    
    await prisma.role.create({
      data : {
        Name : DOMPurify.sanitize(name)
      }
    });

    res.status(200).json({ message : "Success" });
  }

  else res.status(405);

}