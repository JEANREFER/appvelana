import { NextApiRequest, NextApiResponse } from "next";
import { prisma }  from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const weddingId = parseInt(req.query.id as string);
  if (isNaN(weddingId)) {
    return res.status(400).json({ error: "ID de mariage invalide" });
  }

  if (req.method === "GET") {
    try {
      const participants = await prisma.guestfamily.findMany({
        where: { weddingId },
        orderBy: { id: "asc" },
      });
      return res.status(200).json(participants);
    } catch (error) {
      console.error("Erreur GET Guestfamily:", error);
      return res.status(500).json({ error: "Erreur serveur" });
    }
  }

  if (req.method === "POST") {
    try {
      // Ne pas autoriser l'ajout manuel
      const guests = await prisma.guest.findMany({
		  where: {
			weddingId,
			response: "Confirmé", // ➤ ne garde que ceux qui ont répondu "Confirmé"
		  },
		});


      const participantsToCreate = [];

      guests.forEach((guest) => {
        const count = guest.numGuests || 1;
        for (let i = 0; i < count; i++) {
          participantsToCreate.push({
            prénom: i === 0 ? guest.firstName || "Prénom" : `Invité ${i + 1}`,
            nom: guest.lastName || "Nom",
            age: 0,
            family: guest.lastName || "",
            centresInteret: "",
            guestid: guest.id,
            weddingId: weddingId,
            group: "Famille",
          });
        }
      });

      await prisma.guestfamily.deleteMany({ where: { weddingId } });

      const result = await prisma.guestfamily.createMany({
        data: participantsToCreate,
      });

      return res.status(200).json({ message: "Participants générés", count: result.count });
    } catch (error) {
      console.error("Erreur POST Guestfamily:", error);
      return res.status(500).json({ error: "Erreur serveur", details: error });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Méthode ${req.method} non autorisée`);
}
