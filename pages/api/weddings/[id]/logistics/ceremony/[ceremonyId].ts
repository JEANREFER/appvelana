// 📁 pages/api/weddings/[id]/logistics/ceremony/[ceremonyId].ts
import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const ceremonyId = parseInt(req.query.ceremonyId as string);

  if (isNaN(ceremonyId)) {
    return res.status(400).json({ message: "ID de cérémonie invalide." });
  }

  if (req.method === "PUT") {
    const { name, date, location } = req.body;

    try {
      const updated = await prisma.ceremony.update({
        where: { id: ceremonyId },
        data: {
          name,
          date: date ? new Date(date) : null,
          location
        }
      });
      return res.status(200).json(updated);
    } catch (err) {
      console.error("❌ Erreur PUT /logistics/ceremony:", err);
      return res.status(500).json({ message: "Erreur serveur lors de la mise à jour." });
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.ceremony.delete({
        where: { id: ceremonyId }
      });
      return res.status(204).end();
    } catch (err) {
      console.error("❌ Erreur DELETE /logistics/ceremony:", err);
      return res.status(500).json({ message: "Erreur serveur lors de la suppression." });
    }
  }

  return res.status(405).json({ message: "Méthode non autorisée." });
}
