import { prisma } from "../_db";
import { NextApiRequest, NextApiResponse } from "next";

const getByShort = async (req: NextApiRequest, res: NextApiResponse) => {
  const { short } = req.query;
  const link = await prisma.link.findFirst({
    where: {
      short: {
        equals: String(short),
      },
    },
    select: {
      url: true,
    },
  });
  res.status(200).json(link);
};

export default getByShort;
