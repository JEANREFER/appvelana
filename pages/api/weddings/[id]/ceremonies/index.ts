// pages/api/weddings/[id]/ceremonies/index.ts
import { prisma } from "@/lib/prisma"; // ou utiliser chemin relatif selon ton projet
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const weddingId = parseInt(Array.isArray(id) ? id[0] : id);

  if (isNaN(weddingId)) {
    return res.status(400).json({ message: "ID mariage invalide" });
  }

  if (req.method === "PUT") {
    const { wedding_date, budget } = req.body;

    if (!wedding_date || !budget) {
      return res.status(400).json({ message: "Champs manquants" });
    }

    try {
      const updated = await prisma.wedding.update({
        where: { id: weddingId },
        data: {
          wedding_date: new Date(wedding_date),
          budget: parseFloat(budget),
        },
      });

      return res.status(200).json(updated);
    } catch (err) {
      console.error("Erreur mise à jour mariage:", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  }

  return res.status(405).json({ message: "Méthode non autorisée" });
}
