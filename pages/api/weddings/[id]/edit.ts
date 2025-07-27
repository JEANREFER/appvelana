import { prisma } from "../../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { wedding_date, budget } = req.body;

    try {
      const updated = await prisma.wedding.update({
        where: { id: parseInt(id) },
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