// 📁 pages/api/weddings/[id]/logistics/transport.ts
import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const weddingId = parseInt(req.query.id as string);
  const transportId = req.query.transportId ? parseInt(req.query.transportId as string) : null;

  if (isNaN(weddingId)) {
    return res.status(400).json({ message: "ID de mariage invalide" });
  }

  try {
    if (req.method === "GET") {
      const transports = await prisma.transport.findMany({
        where: { weddingId },
        orderBy: { id: "asc" }
      });
      return res.status(200).json(transports);
    }

    if (req.method === "POST") {
      const { type, description, due_date, status } = req.body;

      if (!type || !status) {
        return res.status(400).json({ message: "Champs requis manquants : type ou status" });
      }

      const created = await prisma.transport.create({
        data: {
          type,
          description,
          due_date: due_date ? new Date(due_date) : null,
          status,
          wedding: { connect: { id: weddingId } }
        }
      });

      return res.status(201).json(created);
    }

    if (req.method === "PUT") {
      if (!transportId) return res.status(400).json({ message: "ID de transport requis pour mise à jour" });

      const { type, description, due_date, status } = req.body;

      const updated = await prisma.transport.update({
        where: { id: transportId },
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
      if (!transportId) return res.status(400).json({ message: "ID de transport requis pour suppression" });

      await prisma.transport.delete({ where: { id: transportId } });
      return res.status(204).end();
    }

    return res.status(405).json({ message: "Méthode non autorisée" });
  } catch (error) {
    console.error("Erreur API transport :", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}
