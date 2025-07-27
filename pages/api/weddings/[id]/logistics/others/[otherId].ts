// 📁 pages/api/weddings/[id]/logistics/others/[otherId].ts
import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const idParam = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  const otherIdParam = Array.isArray(req.query.otherId) ? req.query.otherId[0] : req.query.otherId;

  const weddingId = parseInt(idParam ?? "");
  const otherID = parseInt(otherIdParam ?? "");

  if (isNaN(weddingId) || isNaN(otherID)) {
    return res.status(400).json({ message: "ID invalide." });
  }

  if (req.method === "PUT") {
    const { type, details, status } = req.body;

    try {
      const updated = await prisma.other.update({
        where: { id: otherID },
        data: {
          type,
          description: details, // ✅ mapping correct
          status,
        },
      });
      return res.status(200).json(updated);
    } catch (err) {
      console.error("Erreur mise à jour élément logistique :", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.other.delete({ where: { id: otherID } });
      return res.status(204).end();
    } catch (err) {
      console.error("Erreur suppression élément logistique :", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  }

  res.setHeader("Allow", ["PUT", "DELETE"]);
  return res.status(405).json({ message: "Méthode non autorisée" });
}
