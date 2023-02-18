import { prisma } from "../_db";
import { NextApiRequest, NextApiResponse } from "next";
import * as ipfetch from "ipfetch";

const createVisit = async (req: NextApiRequest, res: NextApiResponse) => {
  const { idLink, ip } = req.body;

  const country = await ipInfo.getIPInfo(ip);
  console.log("hola");

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
