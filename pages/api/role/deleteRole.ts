import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../database/database";

export default async function deleteRole(
  req : NextApiRequest,
  res : NextApiResponse
) {
  if (req.method === "POST"){

    const { ID } = req.body;

    await prisma.userRole.updateMany({
      where : {
        UserID : ID
      },
      data : {
        IsDeleted : true
      }
    });

    await prisma.role.updateMany({
      where : {
        ID : ID
      },
      data : {
        IsDeleted : true
      }
    });

    res.status(200).json({ message : "Success" });
  }

  else res.status(405).json({ message : "Bad Request" });
}