// 📁 pages/api/weddings/[id]/notes/index.ts
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const weddingId = parseInt(id as string);

  if (isNaN(weddingId)) {
    return res.status(400).json({ message: "ID de mariage invalide." });
  }

  if (req.method === "GET") {
    try {
      const notes = await prisma.note.findMany({
        where: { weddingId },
        orderBy: { targetDate: "asc" },
      });
      return res.status(200).json(notes);
    } catch (error) {
      console.error("❌ Erreur GET /notes:", error);
      return res.status(500).json({ message: "Erreur lors de la récupération des notes." });
    }
  }

  if (req.method === "POST") {
    const { content, targetDate } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Le contenu est requis." });
    }

    let parsedDate: Date | null = null;
    if (targetDate) {
      try {
        parsedDate = new Date(targetDate);
        if (isNaN(parsedDate.getTime())) {
          throw new Error("Invalid date format");
        }
      } catch (err) {
        return res.status(400).json({ message: "Format de date invalide." });
      }
    }

    try {
      const note = await prisma.note.create({
        data: {
          content,
          targetDate: parsedDate,
          weddingId,
        },
      });
      return res.status(201).json(note);
    } catch (error) {
      console.error("❌ Erreur POST /notes:", error);
      return res.status(500).json({ message: "Erreur lors de l'ajout de la note." });
    }
  }

  return res.status(405).json({ message: "Méthode non autorisée." });
}
