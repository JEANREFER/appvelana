// pages/api/vendors/profile.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (typeof userId !== "string") {
    return res.status(400).json({ error: "ID utilisateur invalide" });
  }

  if (req.method === "GET") {
    try {
      const vendor = await prisma.vendor.findUnique({
        where: { userId: parseInt(userId) }
      });

      if (!vendor) {
        return res.status(404).json({ error: "Prestataire non trouvé" });
      }

      return res.status(200).json(vendor);
    } catch (error) {
      return res.status(500).json({ error: "Erreur serveur", details: error });
    }
  }

  if (req.method === "PUT") {
    const { name, city, description, price, imageUrl } = req.body;

    if (!name || !city || !description || !price) {
      return res.status(400).json({ error: "Champs requis manquants" });
    }

    try {
      const updated = await prisma.vendor.update({
        where: { userId: parseInt(userId) },
        data: { name, city, description, price: parseFloat(price), imageUrl }
      });

      return res.status(200).json(updated);
    } catch (error) {
      return res.status(500).json({ error: "Erreur mise à jour", details: error });
    }
  }

  return res.status(405).json({ error: "Méthode non autorisée" });
}
