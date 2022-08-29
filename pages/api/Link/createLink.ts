import { prisma } from "../_db";
import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";

const createLink = async (req: NextApiRequest, res: NextApiResponse) => {
  const { idUser, title, description, url, picUrl } = req.body;
  if (!idUser || !title || !description || !url) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newLink: Prisma.LinkCreateInput = {
    title: title,
    description: description,
    url: url,
    picUrl: picUrl,
    updatedAt: new Date(),
    User: {
      connect: {
        idUser: idUser,
      },
    },
  };

  const link = await prisma.link.create({
    data: newLink,
  });
  return res.status(200).json(link);
};

export default createLink;
