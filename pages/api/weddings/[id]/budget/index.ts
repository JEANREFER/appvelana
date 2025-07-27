// 📁 pages/api/weddings/[id]/budget/index.ts
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;
  const weddingId = parseInt(id);

  if (isNaN(weddingId)) return res.status(400).json({ message: "ID invalide" });

  if (req.method === "GET") {
    const entries = await prisma.budgetEntry.findMany({
      where: { weddingId },
      orderBy: { id: "asc" },
    });
    return res.status(200).json(entries);
  }

  if (req.method === "POST") {
    const { description, amount, type } = req.body;
    if (!description || !amount || !type) {
      return res.status(400).json({ message: "Champs manquants." });
    }

    const newEntry = await prisma.budgetEntry.create({
      data: {
        description,
        amount: parseFloat(amount),
        type,
        weddingId,
      },
    });
    return res.status(200).json(newEntry);
  }

  return res.status(405).json({ message: "Méthode non autorisée" });
}
