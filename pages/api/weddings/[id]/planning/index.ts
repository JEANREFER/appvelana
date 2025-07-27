// 📁 pages/api/weddings/[id]/planning/index.ts
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const tasks = await prisma.task.findMany({
      where: { weddingId: parseInt(id as string) },
      select: {
        id: true,
        title: true,
        description: true,
        type: true,
        due_date: true,
        status: true,
        completed: true,
      },
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Erreur récupération tâches :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}
