// 📁 pages/api/weddings/[id]/guests/upload.ts
import type { NextApiRequest, NextApiResponse } from "next";
import  { prisma }  from "@/lib/prisma"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const weddingId = Number(req.query.id);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  try {
    const guests = req.body;
	console.log("Contenu reçu depuis Excel :", guests);
    console.log("Wedding ID :", weddingId);


    if (!Array.isArray(guests)) {
      return res.status(400).json({ message: "Le corps de la requête doit être un tableau." });
    }

    const formattedGuests = guests.map((g) => ({
  firstName: String(g.firstName || ""),
  lastName: String(g.lastName || ""),
  phone: g.phone ? String(g.phone) : null,
  email: g.email ? String(g.email) : null,
  response: String(g.response || "En attente"),
  numGuests: Number(g.numGuests) || 1,
  comment: g.comment ? String(g.comment) : "",
  weddingId: weddingId,
}));

    await prisma.guest.createMany({
      data: formattedGuests,
      skipDuplicates: true, // utile si tu imposes une contrainte unique sur email, par exemple
    });

    return res.status(200).json({ message: "Invités importés avec succès." });
  } catch (error) {
    console.error("Erreur API upload invités :", error);
    return res.status(500).json({ message: "Erreur serveur lors de l'import des invités." });
  }
}
