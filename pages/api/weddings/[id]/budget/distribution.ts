// 📁 pages/api/weddings/[id]/budget/distribution.ts
import { prisma } from "../../../../../lib/prisma";


export default async function handler(req, res) {
  const { id } = req.query;
  const weddingId = parseInt(id);

  try {
    const entries = await prisma.budgetEntry.findMany({
      where: {
        weddingId,
        type: "depense",
      },
    });

    const grouped = entries.reduce((acc, entry) => {
      const key = entry.description;
      acc[key] = (acc[key] || 0) + entry.amount;
      return acc;
    }, {});

    const result = Object.entries(grouped).map(([type, amount]) => ({
      type,
      amount,
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
  }
}
