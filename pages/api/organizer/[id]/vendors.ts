import { prisma } from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const organizerId = parseInt(req.query.id);
  if (!organizerId) return res.status(400).json({ message: "ID requis" });

  try {
    // Récupère tous les mariages créés par l'organisateur
    const weddings = await prisma.wedding.findMany({
      where: { created_by: organizerId },
      select: { id: true },
    });

    const weddingIds = weddings.map(w => w.id);

    // Récupère tous les UserVendor liés à ces mariages
    const userVendors = await prisma.userVendor.findMany({
      where: { weddingId: { in: weddingIds } },
      include: {
        vendor: true,
        wedding: {
          select: { couple_name: true, wedding_date: true }
        }
      },
    });

    res.status(200).json(userVendors);
  } catch (error) {
    console.error("Erreur chargement des prestataires :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
}
