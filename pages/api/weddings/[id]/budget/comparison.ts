// 📁 pages/api/weddings/[id]/budget/comparison.ts
import { prisma } from "../../../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;
  const weddingId = parseInt(id);

  try {
    const entries = await prisma.budgetEntry.findMany({
      where: { weddingId },
    });

    const grouped = entries.reduce((acc, entry) => {
      if (!acc[entry.type]) acc[entry.type] = 0;
      acc[entry.type] += entry.amount;
      return acc;
    }, {});

    const result = Object.entries(grouped).map(([type, total]) => ({
      type,
      prevu: 0,  // à enrichir si besoin avec un budget prévisionnel
      reel: total,
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
  }
}
