import DOMPurify from "isomorphic-dompurify";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../database/database";

export default async function updateRole(
  req : NextApiRequest,
  res : NextApiResponse
){
  if (req.method == "POST"){
    
    const { ID, name } = req.body;

    await prisma.role.update({
      where :{
        ID : ID
      },
      data : {
        Name : DOMPurify.sanitize(name)
      }
    });

    res.status(200).json({ message : "Success" });

  }

  else res.status(405).json({ message : "Bad Method" });
}