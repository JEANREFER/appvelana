// 📁 pages/api/weddings/[id]/planning/index.ts
import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const weddingId = parseInt(req.query.id as string);
  if (isNaN(weddingId)) return res.status(400).json({ message: "ID de mariage invalide" });

  if (req.method === "GET") {
    const milestones = await prisma.milestone.findMany({ where: { weddingId }, orderBy: { date: "asc" } });
    return res.status(200).json(milestones);
  }

  if (req.method === "POST") {
    const { title, date, status } = req.body;
    if (!title || !date || !status) return res.status(400).json({ message: "Champs manquants" });

    const milestone = await prisma.milestone.create({
      data: {
        title,
        date: new Date(date),
        status,
        wedding: { connect: { id: weddingId } },
      },
    });
    return res.status(201).json(milestone);
  }

  return res.status(405).json({ message: "Méthode non autorisée" });
}
