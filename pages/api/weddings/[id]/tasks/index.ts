import { prisma } from "../../../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "POST") {
    const { type, description, due_date, status } = req.body;

    if (!type || !status) {
      return res.status(400).json({ message: "Le type et le statut sont obligatoires." });
    }

    try {
      const task = await prisma.task.create({
        data: {
          title: type,
          type,
          description,
          due_date: due_date ? new Date(due_date) : null,
          status,
          weddingId: parseInt(id),
          completed: status === "Fait"
        }
      });

      return res.status(201).json(task);
    } catch (error) {
      console.error("Erreur création tâche :", error);
      return res.status(500).json({ message: "Erreur serveur lors de la création de la tâche." });
    }
  }

  if (req.method === "GET") {
    const tasks = await prisma.task.findMany({
      where: { weddingId: parseInt(id) },
      orderBy: { due_date: "asc" }
    });
    return res.status(200).json(tasks);
  }

  return res.status(405).json({ message: "Méthode non autorisée." });
}
