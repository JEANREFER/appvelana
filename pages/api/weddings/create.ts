
// pages/api/weddings/create.ts
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { couple_name, wedding_date, budget, created_by } = req.body;

  console.log({ couple_name, wedding_date, budget, created_by });

  if (!created_by) {
    return res.status(401).json({ error: "Non autorisé : utilisateur manquant" });
  }

  const createdByInt = parseInt(created_by, 10);
  if (isNaN(createdByInt)) {
    return res.status(400).json({ error: "ID utilisateur invalide" });
  }

  try {
    const wedding = await prisma.wedding.create({
      data: {
        couple_name,
        wedding_date: new Date(wedding_date),
        budget: budget ? parseFloat(budget) : 0.0,
        created_by: createdByInt,  // Important : passer l'entier
      },
    });

    res.status(201).json(wedding);
  } catch (error) {
    console.error("Erreur création mariage :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}
