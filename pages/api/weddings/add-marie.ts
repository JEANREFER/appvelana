// ✅ Fichier : pages/api/weddings/[id]/add-marie.ts

import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const weddingId = parseInt(req.query.id);
  const { userId } = req.body;

  if (!userId || !weddingId) {
    return res.status(400).json({ message: "Paramètres manquants" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user || user.role !== "marie") {
      return res.status(400).json({ message: "Utilisateur non valide ou non marié(e)" });
    }

    // Vérifie si l'association existe déjà
    const existing = await prisma.userWeddingAccess.findUnique({
      where: {
        userId_weddingId: {
          userId: userId,
          weddingId: weddingId,
        },
      },
    });

    if (existing) {
      return res.status(409).json({ message: "L'utilisateur est déjà lié à ce mariage." });
    }

    const link = await prisma.userWeddingAccess.create({
      data: {
        userId,
        weddingId,
      },
    });

    res.status(200).json(link);
  } catch (error) {
    console.error("Erreur ajout marié(e) au mariage:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
}