import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../database/database";

interface IGetAllUsersOutput {
  data: User[]
}

export default async function getAllUsers(req: NextApiRequest, res: NextApiResponse) {
  const Users = await prisma.user.findMany({
    select: {
      Username: true,
      Email: true,
      ID : true
    },
    where: {
      IsDeleted : false
    }
  });

  res.status(200).json(Users);
}