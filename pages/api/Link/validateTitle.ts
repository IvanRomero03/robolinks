import { prisma } from "../_db";
import { NextApiRequest, NextApiResponse } from "next";

const validateTitle = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title } = req.body;
  const link = await prisma.link.findMany({
    where: {
      title: {
        equals: title,
      },
    },
    select: {
      idLink: true,
    },
  });
  res.status(200).json(!(link.length > 0));
};

export default validateTitle;
