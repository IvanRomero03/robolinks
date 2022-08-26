import { prisma } from "../_db";
import { NextApiRequest, NextApiResponse } from "next";

const createLink = async (req: NextApiRequest, res: NextApiResponse) => {
  const { idUser, title, description, url, picUrl } = req.body;
  if (!idUser || !title || !description || !url) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const link = await prisma.link.create({
    data: {
      idUser: Number(idUser),
      title: title,
      description: description,
      url: url,
      picUrl: picUrl ?? "", //TODO: add default pic
    },
  });
  res.status(200).json(link);
};

export default createLink;
