import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma"; // adapte le chemin selon ton projet

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const wedding = await prisma.wedding.findUnique({
      where: { id: parseInt(id as string, 10) },
    });

    if (!wedding) {
      return res.status(404).json({ error: "Mariage non trouvé" });
    }

    res.status(200).json(wedding);
  } catch (error) {
    console.error("Erreur API:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}
