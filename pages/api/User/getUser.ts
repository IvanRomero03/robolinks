import { prisma } from "../_db";
import { NextApiRequest, NextApiResponse } from "next";

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { idUser } = req.query;
  const user = await prisma.user.findUnique({
    where: {
      idUser: Number(idUser),
    },
  });
  res.status(200).json(user);
};

export default getUser;
