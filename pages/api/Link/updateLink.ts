import { prisma } from "../_db";
import { NextApiRequest, NextApiResponse } from "next";

const updateLink = async (req: NextApiRequest, res: NextApiResponse) => {
  const { idLink, url, description, title, picUrl } = req.body;
  if (!idLink || !url || !title) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const link = await prisma.link.update({
    where: {
      idLink: Number(idLink),
    },
    data: {
      url: url,
      description: description,
      title: title,
      picUrl:
        picUrl ?? "https://cdn-icons-png.flaticon.com/512/3541/3541854.png",
    },
  });
  res.status(200).json(link);
};

export default updateLink;
