import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const weddingId = parseInt(req.query.id as string);
  const accommodationId = parseInt(req.query.accommodationId as string); // seulement utilisé pour PUT / DELETE

  if (isNaN(weddingId)) {
    return res.status(400).json({ message: "ID de mariage invalide" });
  }

  if (req.method === "GET") {
    try {
      const accommodations = await prisma.accommodation.findMany({
        where: { weddingId },
        orderBy: { due_date: "asc" },
      });
      return res.status(200).json(accommodations);
    } catch (error) {
      console.error("Erreur récupération hébergements :", error);
      return res.status(500).json({ message: "Erreur serveur lors de la récupération" });
    }
  }

  if (req.method === "POST") {
    const { type, description, due_date, status } = req.body;

    if (!type || !status) {
      return res.status(400).json({ message: "Champs requis manquants : type ou status" });
    }

    try {
      const created = await prisma.accommodation.create({
        data: {
          type,
          description,
          due_date: due_date ? new Date(due_date) : null,
          status,
          wedding: { connect: { id: weddingId } },
        },
      });

      return res.status(201).json(created);
    } catch (error) {
      console.error("Erreur création accommodation :", error);
      return res.status(500).json({ message: "Erreur serveur lors de la création" });
    }
  }

  if (req.method === "PUT") {
    if (isNaN(accommodationId)) {
      return res.status(400).json({ message: "ID d'hébergement invalide" });
    }

    const { type, description, due_date, status } = req.body;

    try {
      const updated = await prisma.accommodation.update({
        where: { id: accommodationId },
        data: {
          type,
          description,
          due_date: due_date ? new Date(due_date) : null,
          status,
        },
      });

      return res.status(200).json(updated);
    } catch (error) {
      console.error("Erreur mise à jour accommodation :", error);
      return res.status(500).json({ message: "Erreur serveur lors de la mise à jour" });
    }
  }

  if (req.method === "DELETE") {
    if (isNaN(accommodationId)) {
      return res.status(400).json({ message: "ID d'hébergement invalide" });
    }

    try {
      await prisma.accommodation.delete({ where: { id: accommodationId } });
      return res.status(204).end();
    } catch (error) {
      console.error("Erreur suppression accommodation :", error);
      return res.status(500).json({ message: "Erreur serveur lors de la suppression" });
    }
  }

  return res.status(405).json({ message: "Méthode non autorisée" });
}
