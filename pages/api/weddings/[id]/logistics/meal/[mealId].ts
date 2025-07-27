// 📁 /pages/api/weddings/[id]/logistics/meal/[mealId].ts
import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const mealId = parseInt(req.query.mealId as string);

  if (isNaN(mealId)) {
    return res.status(400).json({ message: "ID de repas invalide." });
  }

  if (req.method === "PUT") {
    const { type, description, due_date, status } = req.body;

    const updated = await prisma.meal.update({
      where: { id: mealId },
      data: {
        type,
        description,
        due_date: due_date ? new Date(due_date) : null,
        status,
      },
    });

    return res.status(200).json(updated);
  }

  if (req.method === "DELETE") {
    await prisma.meal.delete({ where: { id: mealId } });
    return res.status(204).end();
  }

  return res.status(405).json({ message: "Méthode non autorisée." });
}
	