import { prisma } from "../_db";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../client";

const createVisit = async (req: NextApiRequest, res: NextApiResponse) => {
  const { idLink, ip } = req.body;
  const { data } = await client.get("https://geolocation-db.com/json/" + ip);

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
