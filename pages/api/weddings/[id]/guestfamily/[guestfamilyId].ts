import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { guestfamilyId } = req.query;

  if (!guestfamilyId || Array.isArray(guestfamilyId)) {
    res.status(400).json({ message: "ID invalide" });
    return;
  }

  const id = parseInt(guestfamilyId as string);

  if (isNaN(id)) {
    res.status(400).json({ message: "ID non numérique" });
    return;
  }

  if (req.method === 'PUT') {
    const { prénom, nom, age, family, group } = req.body;

    try {
      const updated = await prisma.guestfamily.update({
        where: { id },
        data: {
          prénom,
          nom,
          age: parseInt(age),
          family,
          group,
        },
      });
      res.status(200).json(updated);
    } catch (error) {
      console.error("Erreur PUT guestfamily :", error);
      res.status(500).json({ message: "Erreur mise à jour" });
    }
    return;
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.guestfamily.delete({
        where: { id },
      });
      res.status(200).json({ message: "Membre supprimé" });
    } catch (error) {
      console.error("Erreur DELETE guestfamily :", error);
      res.status(500).json({ message: "Erreur suppression" });
    }
    return;
  }

  res.setHeader("Allow", ["PUT", "DELETE"]);
  res.status(405).end(`Méthode ${req.method} non autorisée`);
}
