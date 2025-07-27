import { prisma } from "../../../../../lib/prisma";

export default async function handler(req, res) {
  const { taskId } = req.query;

  if (req.method === "PUT") {
    const { type, description, due_date, status } = req.body;

    try {
      const task = await prisma.task.update({
        where: { id: parseInt(taskId) },
        data: {
          title: type,
          type,
          description,
          due_date: due_date ? new Date(due_date) : null,
          status,
          completed: status === "Fait",
        },
      });

      return res.status(200).json(task);
    } catch (error) {
      console.error("Erreur mise à jour tâche :", error);
      return res.status(500).json({ message: "Erreur serveur lors de la mise à jour de la tâche." });
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.task.delete({
        where: { id: parseInt(taskId) },
      });

      return res.status(200).json({ message: "Tâche supprimée avec succès." });
    } catch (error) {
      console.error("Erreur suppression tâche :", error);
      return res.status(500).json({ message: "Erreur serveur lors de la suppression de la tâche." });
    }
  }

  return res.status(405).json({ message: "Méthode non autorisée." });
}
