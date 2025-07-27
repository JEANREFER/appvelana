// 📁 pages/api/weddings/[id]/logistics/overview.ts
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

const categories = [
  { key: "meals", model: prisma.meal },
  { key: "transport", model: prisma.transport },
  { key: "accommodation", model: prisma.accommodation },
  { key: "ceremonies", model: prisma.ceremony },
  { key: "animations", model: prisma.animation },
  { key: "outfits", model: prisma.outfit },
  { key: "others", model: prisma.other },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const weddingId = parseInt(req.query.id as string);

  if (isNaN(weddingId)) {
    return res.status(400).json({ message: "ID de mariage invalide." });
  }

  try {
    const wedding = await prisma.wedding.findUnique({
      where: { id: weddingId },
      select: {
        id: true,
        couple_name: true,
        wedding_date: true,
        budget: true,
      },
    });

    if (!wedding) {
      return res.status(404).json({ message: "Mariage non trouvé." });
    }

    const result: Record<string, any> = { wedding };

    for (const category of categories) {
      try {
        // 👇 Solution : cast dynamique pour éviter l’erreur d’union
        const items = await (category.model as any).findMany({
          where: { weddingId },
        });

        const stats = {
          total: items.length,
          "À faire": 0,
          "Fait": 0,
          "Abandonné": 0,
          nextDate: null as string | null,
        };

        let nextDate: Date | null = null;

        for (const item of items) {
          const status = item.status || "À faire";
          stats[status] = (stats[status] || 0) + 1;

          if (item.due_date) {
            const d = new Date(item.due_date);
            if (!nextDate || d < nextDate) {
              nextDate = d;
            }
          }
        }

        stats.nextDate = nextDate ? nextDate.toISOString() : null;
        result[category.key] = stats;
      } catch (err) {
        console.error(`Erreur chargement ${category.key}:`, err);
        result[category.key] = {
          total: 0,
          "À faire": 0,
          Fait: 0,
          Abandonné: 0,
          nextDate: null,
        };
      }
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Erreur serveur overview:", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
}
