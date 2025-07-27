// 📁 pages/api/user-vendors/index.ts
import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { weddingId } = req.query;

    if (!weddingId) {
      return res.status(400).json({ message: "weddingId requis" });
    }

    try {
      const vendors = await prisma.userVendor.findMany({
        where: { weddingId: parseInt(weddingId as string, 10) },
        include: {
          user: true,
          vendor: true,
        },
      });
      return res.status(200).json(vendors);
    } catch (error) {
      console.error("Erreur lors de la lecture des prestataires utilisateur:", error);
      return res.status(500).json({ message: "Erreur serveur lors de la lecture des prestataires." });
    }
  }

  if (req.method === "POST") {
    const {
      userId,
      vendorId,
      weddingId,
      name,
      city,
      description,
      price,
      deposit,
      paid,
      note,
      custom,
    } = req.body;

    // ✅ Sécurité : champs requis
    if (!userId || !weddingId || !name || typeof name !== "string") {
      return res.status(400).json({ message: "Champs requis manquants ou invalides." });
    }

    const trimmedName = name.trim().toLowerCase(); // nom nettoyé pour les doublons

    try {
      let existing;

      if (custom) {
        // ✅ Vérifie si un prestataire personnalisé existe déjà (nom insensible à la casse)
        existing = await prisma.userVendor.findFirst({
          where: {
            userId,
            weddingId,
            custom: true,
            name: {
              contains: trimmedName,
            },
          },
        });
      } else {
        // ✅ Vérifie si le prestataire référencé est déjà utilisé
        if (!vendorId) {
          return res.status(400).json({ message: "vendorId requis pour les prestataires non personnalisés." });
        }

        existing = await prisma.userVendor.findFirst({
          where: {
            userId,
            vendorId,
            weddingId,
          },
        });
      }

      if (existing) {
        return res.status(409).json({ message: "Ce prestataire est déjà ajouté." });
      }

      // ✅ Création du prestataire (sans vendorId si custom)
      const created = await prisma.userVendor.create({
        data: {
          userId,
          weddingId,
          name: trimmedName,
          city: city?.trim() || "",
          description: description?.trim() || "",
          price: parseFloat(price) || 0,
          deposit: parseFloat(deposit) || 0,
          paid: !!paid,
          note: parseInt(note) || 0,
          custom: !!custom,
          ...(custom ? {} : { vendorId }),
        },
      });

      return res.status(201).json(created);
    } catch (error) {
      console.error("Erreur lors de la création du prestataire utilisateur:", error);
      return res.status(500).json({ message: "Erreur serveur lors de la création du prestataire." });
    }
  }

  return res.status(405).json({ message: "Méthode non autorisée" });
}
