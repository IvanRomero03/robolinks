import { prisma } from "../_db";
import { NextApiRequest, NextApiResponse } from "next";

const updateLink = async (req: NextApiRequest, res: NextApiResponse) => {
  const { idLink, url, description, title, picUrl } = req.body;
  const link = await prisma.link.update({
    where: {
      idLink: Number(idLink),
    },
    data: {
      url: url,
      description: description,
      title: title,
      picUrl: picUrl,
    },
  });
  res.status(200).json(link);
};

export default updateLink;
