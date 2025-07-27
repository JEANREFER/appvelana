// 📁 pages/api/weddings/[id]/logistics/others/index.ts
import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const idParam = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  const weddingId = parseInt(idParam ?? "");

  if (isNaN(weddingId)) {
    return res.status(400).json({ message: "ID de mariage invalide." });
  }

  if (req.method === "GET") {
    try {
      const others = await prisma.other.findMany({
        where: { weddingId },
        orderBy: { id: "asc" },
      });
      return res.status(200).json(others);
    } catch (err) {
      console.error("Erreur récupération éléments logistiques :", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  }

  if (req.method === "POST") {
    const { type, details, status } = req.body;

    try {
      const created = await prisma.other.create({
        data: {
          weddingId,
          type,
          description: details, // ✅ mapping correct
          status,
        },
      });
      return res.status(200).json(created);
    } catch (err) {
      console.error("Erreur création élément logistique :", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ message: `Méthode ${req.method} non autorisée.` });
}
