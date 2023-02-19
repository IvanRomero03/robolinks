import { prisma } from "../_db";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../client";

const createVisit = async (req: NextApiRequest, res: NextApiResponse) => {
  const { idLink, ip } = req.body;

  const { data } = await client.post("https://www.iplocation.net/get-ipdata", {
    body: {
      ip: ip,
      source: "ipinfo",
      ipv: "4",
    },
  });

  console.log("hola", data);
  console.log(data?.res?.region);
  if (!idLink) {
    res.status(400).json({ error: "Missing parameters" });
    return;
  }

  const visit = await prisma.visit.create({
    data: {
      country: data?.res?.region,
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
