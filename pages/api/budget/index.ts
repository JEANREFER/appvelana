// 📁 pages/api/weddings/[id]/budget/index.ts
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;
  const weddingId = parseInt(id);

  if (isNaN(weddingId)) {
    return res.status(400).json({ message: "ID de mariage invalide." });
  }

  if (req.method === "GET") {
    try {
      const entries = await prisma.budgetEntry.findMany({
        where: { weddingId },
        orderBy: { id: "asc" },
      });
      return res.status(200).json(entries);
    } catch (err) {
      console.error("Erreur GET /budget:", err);
      return res.status(500).json({ message: "Erreur lors du chargement du budget." });
    }
  } else if (req.method === "POST") {
    const { description, amount, type } = req.body;

    if (!description || amount === undefined || amount === null || !type) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    try {
      const newEntry = await prisma.budgetEntry.create({
        data: {
          description,
          amount: parseFloat(amount),
          type,
          weddingId,
        },
      });
      return res.status(200).json(newEntry);
    } catch (err) {
      console.error("Erreur POST /budget:", err);
      return res.status(500).json({ message: "Erreur lors de l'ajout du budget." });
    }
  } else {
    return res.status(405).json({ message: "Méthode non autorisée." });
  }
}
