// 📁 /pages/api/weddings/[id]/logistics/meal/index.ts
import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const weddingId = parseInt(id as string);

  if (isNaN(weddingId)) {
    return res.status(400).json({ message: "ID de mariage invalide" });
  }

  if (req.method === "GET") {
    try {
      const meals = await prisma.meal.findMany({ where: { weddingId } });
      return res.status(200).json(meals);
    } catch (error) {
      console.error("❌ Erreur GET /logistics/meal:", error);
      return res.status(500).json({ message: "Erreur serveur lors du GET." });
    }
  }

  if (req.method === "POST") {
    const { type, description, due_date, status } = req.body;

    try {
      const newMeal = await prisma.meal.create({
        data: {
          type,
          description,
          status,
          due_date: due_date ? new Date(due_date) : null,
          weddingId,
        },
      });

      return res.status(201).json(newMeal);
    } catch (error) {
      console.error("❌ Erreur POST /logistics/meal:", error); // ✅ affiche l'erreur
      return res.status(500).json({ message: "Erreur serveur lors de la création du repas." });
    }
  }

  return res.status(405).json({ message: "Méthode non autorisée" });
}
