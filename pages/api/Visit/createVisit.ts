import { prisma } from "../_db";
import { NextApiRequest, NextApiResponse } from "next";

const createVisit = async (req: NextApiRequest, res: NextApiResponse) => {
  const { idLink, country, ip } = req.body;

  if (!idLink) {
    res.status(400).json({ error: "Missing parameters" });
    return;
  }

  const visit = await prisma.visit.create({
    data: {
      country: country,
      ip: ip,
      Link: {
        connect: {
          idLink: idLink,
        },
      },
    },
  });

  res.status(200).json(visit);
};

export default createVisit;
