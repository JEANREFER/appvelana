// 📁 pages/api/weddings/[id]/logistics/ceremony/index.ts
import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const weddingId = parseInt(req.query.id as string);

  if (isNaN(weddingId)) {
    return res.status(400).json({ message: "ID de mariage invalide." });
  }

  if (req.method === "GET") {
    try {
      const ceremonies = await prisma.ceremony.findMany({
        where: { weddingId },
        orderBy: { date: "asc" },
      });
      return res.status(200).json(ceremonies);
    } catch (err) {
      console.error("❌ Erreur GET /logistics/ceremony:", err);
      return res.status(500).json({ message: "Erreur serveur GET cérémonie." });
    }
  }

  if (req.method === "POST") {
    const { name, date, location } = req.body;
    console.log("📥 Données reçues POST :", req.body);

    try {
      const newCeremony = await prisma.ceremony.create({
        data: {
          name,
          date: date ? new Date(date) : null,
          location,
          weddingId,
        },
      });
      return res.status(201).json(newCeremony);
    } catch (err) {
      console.error("❌ Erreur POST /logistics/ceremony:", err);
      return res.status(500).json({ message: "Erreur serveur POST cérémonie." });
    }
  }

  return res.status(405).json({ message: "Méthode non autorisée." });
}
