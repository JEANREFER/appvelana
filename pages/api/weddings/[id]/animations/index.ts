// 📁 pages/api/weddings/[id]/animations/index.ts
import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const weddingId = parseInt(Array.isArray(id) ? id[0] : id);

  if (isNaN(weddingId)) {
    return res.status(400).json({ message: "ID mariage invalide" });
  }

  if (req.method === "GET") {
    try {
      const animations = await prisma.animation.findMany({
        where: { weddingId },
        orderBy: { id: "asc" }
      });
      return res.status(200).json(animations);
    } catch (err) {
      console.error("Erreur GET /animations:", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  }

  if (req.method === "POST") {
    const { type, performer, time, contact } = req.body;

    if (!type || !performer) {
      return res.status(400).json({ message: "Champs requis manquants" });
    }

    try {
      const animation = await prisma.animation.create({
        data: {
          type,
          performer,
          time: time || null,
          contact: contact || null,
          weddingId
        }
      });
      return res.status(200).json(animation);
    } catch (err) {
      console.error("Erreur POST /animations:", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  }

  return res.status(405).json({ message: "Méthode non autorisée" });
}
