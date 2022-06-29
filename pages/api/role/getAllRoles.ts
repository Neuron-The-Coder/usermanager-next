import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../database/database";

export default async function getAllRoles(
  req : NextApiRequest,
  res : NextApiResponse
){
  const roles = await prisma.role.findMany({
    where : {
      IsDeleted : false
    }
  });

  return res.status(200).json(roles);

}