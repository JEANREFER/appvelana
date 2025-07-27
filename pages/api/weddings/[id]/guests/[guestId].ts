import { prisma } from "../../../../../lib/prisma";

export default async function handler(req, res) {
  const { guestId } = req.query;

  if (req.method === "PUT") {
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
        .json({ message: "Prénom et Nom obligatoires." });
    }

    try {
      const updatedGuest = await prisma.guest.update({
        where: { id: parseInt(guestId) },
        data: {
          firstName,
          lastName,
          phone: phone || null,
          email: email || null,
          response: response || "En attente",
          numGuests: numGuests ? parseInt(numGuests) : 1,
          comment: comment || null,
        },
      });

      // Supprimer les Guestfamily liés
      await prisma.guestfamily.deleteMany({
        where: { guestid: updatedGuest.id },
      });

      // Recréer les lignes Guestfamily
      const guestfamilyData = Array.from({ length: updatedGuest.numGuests }).map(
        (_, index) => ({
          prénom: index === 0 ? updatedGuest.firstName : `${updatedGuest.firstName} ${index + 1}`,
          nom: updatedGuest.lastName,
          age: 30,
          family: updatedGuest.lastName,
          centresInteret: "",
          guestid: updatedGuest.id,
          weddingId: updatedGuest.weddingId,
          group: "Famille",
        })
      );

      await prisma.guestfamily.createMany({
        data: guestfamilyData,
      });

      return res.status(200).json(updatedGuest);
    } catch (error) {
      console.error("Erreur modification invité :", error);
      return res.status(500).json({ message: "Erreur interne serveur." });
    }
  }

  if (req.method === "DELETE") {
    try {
      // Supprimer d'abord les Guestfamily liés
      await prisma.guestfamily.deleteMany({
        where: { guestid: parseInt(guestId) },
      });

      // Puis supprimer l'invité principal
      await prisma.guest.delete({
        where: { id: parseInt(guestId) },
      });

      return res.status(200).json({ message: "Invité supprimé." });
    } catch (error) {
      console.error("Erreur suppression invité :", error);
      return res.status(500).json({ message: "Erreur serveur suppression." });
    }
  }

  res.status(405).json({ message: "Méthode non autorisée." });
}
