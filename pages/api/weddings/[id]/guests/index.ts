import { prisma } from "../../../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    const guests = await prisma.guest.findMany({
      where: { weddingId: parseInt(id) },
    });
    return res.status(200).json(guests);
  }

  if (req.method === "POST") {
    const {
      firstName,
      lastName,
      phone,
      email,
      response,
      numGuests,
      comment,
    } = req.body;

    if (!firstName || !lastName) {
      return res
        .status(400)
        .json({ message: "Prénom et Nom sont obligatoires." });
    }

    try {
      const createdGuest = await prisma.guest.create({
        data: {
          firstName,
          lastName,
          phone: phone || null,
          email: email || null,
          response: response || "En attente",
          numGuests: numGuests ? parseInt(numGuests) : 1,
          comment: comment || null,
          weddingId: parseInt(id),
        },
      });

      const nbParticipants = createdGuest.numGuests || 1;

      const guestfamilyData = Array.from({ length: nbParticipants }).map(
        (_, index) => ({
          prénom: index === 0 ? firstName : `${firstName} ${index + 1}`,
          nom: lastName,
          age: 30, // valeur par défaut
          family: lastName,
          centresInteret: "",
          guestid: createdGuest.id,
          weddingId: createdGuest.weddingId,
          group: "Famille",
        })
      );

      await prisma.guestfamily.createMany({
        data: guestfamilyData,
      });

      return res.status(201).json(createdGuest);
    } catch (error) {
      console.error("Erreur création invité + guestfamily :", error);
      return res
        .status(500)
        .json({ message: "Erreur interne lors de l'ajout de l'invité." });
    }
  }

  res.status(405).json({ message: "Méthode non autorisée." });
}
