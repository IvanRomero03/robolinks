import { prisma } from "../_db";
import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";

const createLink = async (req: NextApiRequest, res: NextApiResponse) => {
  const { idUser, title, description, url, picUrl, tags } = req.body;
  if (!idUser || !title || !url) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newLink: Prisma.LinkCreateInput = {
    title: title,
    description: description,
    url: url,
    picUrl: picUrl ?? "https://cdn-icons-png.flaticon.com/512/3541/3541854.png",
    updatedAt: new Date(),
    User: {
      connect: {
        idUser: Number(idUser),
      },
    },
  };

  const link = await prisma.link.create({
    data: newLink,
  });

  const idLink = link.idLink;

  if (tags) {
    const newLinkTags = await prisma.linkTags.createMany({
      data: tags.map((tag: string) => ({
        idLink: idLink,
        idTag: tag,
      })),
    });
    console.log(newLinkTags);
  }

  return res.status(200).json(link);
};

export default createLink;
