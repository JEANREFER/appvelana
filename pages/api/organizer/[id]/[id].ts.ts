import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const organizerId = parseInt(req.query.id);
  if (!organizerId) return res.status(400).json({ message: "ID manquant" });

  try {
    const weddings = await prisma.wedding.findMany({
      where: { created_by: organizerId },
      orderBy: { wedding_date: "asc" },
    });

    res.status(200).json(weddings);
  } catch (error) {
    console.error("Erreur chargement mariages organisateur :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
}
