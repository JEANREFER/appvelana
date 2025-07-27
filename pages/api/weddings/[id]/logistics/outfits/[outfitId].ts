// 📁 pages/api/weddings/[id]/logistics/outfits/[outfitId].ts
import { prisma } from "@/lib/prisma";


export default async function handler(req, res) {
  const { id, outfitId } = req.query;
  const weddingId = parseInt(id);
  const outfitID = parseInt(outfitId);

  if (isNaN(weddingId) || isNaN(outfitID)) {
    return res.status(400).json({ message: "ID invalide." });
  }

  if (req.method === "PUT") {
    const { person, type, details, status } = req.body;

    try {
      const updated = await prisma.outfit.update({
        where: { id: outfitID },
        data: { person, type, details, status },
      });
      return res.status(200).json(updated);
    } catch (err) {
      console.error("Erreur mise à jour tenue :", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.outfit.delete({ where: { id: outfitID } });
      return res.status(204).end();
    } catch (err) {
      console.error("Erreur suppression tenue :", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  }

  return res.status(405).json({ message: "Méthode non autorisée" });
}

