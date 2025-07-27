// 📁 pages/api/weddings/[id]/logistics/outfits/index.ts
import { prisma } from "@/lib/prisma";


export default async function handler(req, res) {
  const { id } = req.query;
  const weddingId = parseInt(id);

  if (isNaN(weddingId)) {
    return res.status(400).json({ message: "ID de mariage invalide." });
  }

  if (req.method === "GET") {
    const outfits = await prisma.outfit.findMany({
      where: { weddingId },
      orderBy: { id: "asc" },
    });
    return res.status(200).json(outfits);
  }

  if (req.method === "POST") {
    const { person, type, details, status } = req.body;

    try {
      const created = await prisma.outfit.create({
        data: {
          weddingId,
          person,
          type,
          details,
          status,
        },
      });
      return res.status(200).json(created);
    } catch (err) {
      console.error("Erreur lors de la création d'une tenue :", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  }

  return res.status(405).end();
}
