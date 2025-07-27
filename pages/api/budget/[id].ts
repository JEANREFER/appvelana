
// 📁 pages/api/budget/[id].ts
import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;
  const budgetId = parseInt(id);

  if (isNaN(budgetId)) {
    return res.status(400).json({ message: "ID invalide." });
  }

  if (req.method === "PUT") {
    const { description, amount, type } = req.body;

    if (!description || amount === undefined || !type) {
      return res.status(400).json({ message: "Champs requis manquants." });
    }

    try {
      const updated = await prisma.budgetEntry.update({
        where: { id: budgetId },
        data: {
          description,
          amount: parseFloat(amount),
          type
        }
      });
      return res.status(200).json(updated);
    } catch (err) {
      console.error("Erreur PUT /budget/[id]:", err);
      return res.status(500).json({ message: "Erreur lors de la mise à jour." });
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.budgetEntry.delete({
        where: { id: budgetId }
      });
      return res.status(200).json({ message: "Supprimé avec succès." });
    } catch (err) {
      console.error("Erreur DELETE /budget/[id]:", err);
      return res.status(500).json({ message: "Erreur lors de la suppression." });
    }
  }

  return res.status(405).json({ message: "Méthode non autorisée." });
}
