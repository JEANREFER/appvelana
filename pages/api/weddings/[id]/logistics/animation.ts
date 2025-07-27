// 📁 pages/api/weddings/[id]/logistics/animation.ts
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;
  const weddingId = parseInt(id);

  if (isNaN(weddingId)) {
    return res.status(400).json({ message: "ID de mariage invalide." });
  }

  if (req.method === "GET") {
    const animations = await prisma.animation.findMany({
      where: { weddingId },
      orderBy: { id: "asc" },
    });
    return res.status(200).json(animations);
  }

  if (req.method === "POST") {
    const { type, performer, time, contact } = req.body;

    try {
      const created = await prisma.animation.create({
        data: {
          weddingId,
          type,
          performer,
          time,
          contact,
        },
      });
      return res.status(201).json(created);
    } catch (err) {
      console.error("Erreur création animation:", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  }

  if (req.method === "PUT") {
    const { type, performer, time, contact } = req.body;
    const animationId = parseInt(req.query.animationId);

    if (isNaN(animationId)) {
      return res.status(400).json({ message: "ID d'animation invalide." });
    }

    try {
      const updated = await prisma.animation.update({
        where: { id: animationId },
        data: { type, performer, time, contact },
      });
      return res.status(200).json(updated);
    } catch (err) {
      console.error("Erreur modification animation:", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  }

  if (req.method === "DELETE") {
    const animationId = parseInt(req.query.animationId);
    if (isNaN(animationId)) return res.status(400).json({ message: "ID invalide." });

    try {
      await prisma.animation.delete({ where: { id: animationId } });
      return res.status(204).end();
    } catch (err) {
      console.error("Erreur suppression animation:", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  }

  return res.status(405).end();
}
