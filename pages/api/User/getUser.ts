import { prisma } from "../_db";
import { NextApiRequest, NextApiResponse } from "next";

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { idUser } = req.query;
  console.log(idUser);
  if (!idUser || idUser === "null") {
    res
      .status(400)
      .json({ message: "Missing idUser", title: "Invalid request" });
    return;
  }
  const user = await prisma.user.findUnique({
    where: {
      idUser: Number(idUser),
    },
  });
  res.status(200).json(user);
};

export default getUser;
