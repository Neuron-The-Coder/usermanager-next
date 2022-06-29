import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../database/database";

export default async function deleteUser (
  req : NextApiRequest,
  res : NextApiResponse
) {

  if (req.method == "POST"){

    const { ID } = req.body;

    await prisma.user.update({
      data : {
        IsDeleted : true
      },
      where : {
        ID : ID
      }
    });

    await prisma.userRole.updateMany({
      data : {
        IsDeleted : true
      },
      where : {
        UserID : ID
      }
    });

    res.status(200).json({
      message : "Success"
    });
  }

  else res.status(405).json({ message : "Bad Request"});
}
