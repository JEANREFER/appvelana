// 📁 pages/api/weddings/[id]/notes/[noteId].ts
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../lib/prisma"; // Assurez-vous d'importer correctement Prisma

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const weddingId = Number(req.query.id);
  const noteId = Number(req.query.noteId);

  if (isNaN(weddingId) || isNaN(noteId)) {
    return res.status(400).json({ message: "Identifiants invalides" });
  }

  switch (req.method) {
    case "GET":
      try {
        const note = await prisma.note.findUnique({
          where: { id: noteId }
        });

        if (!note) {
          return res.status(404).json({ message: "Note introuvable" });
        }

        return res.status(200).json(note);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Erreur serveur" });
      }

    case "PUT":
      try {
        const { content, targetDate } = req.body;

        const updated = await prisma.note.update({
          where: { id: noteId },
          data: {
            content,
            targetDate: targetDate ? new Date(targetDate) : null
          }
        });

        return res.status(200).json(updated);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Erreur lors de la mise à jour" });
      }

    case "DELETE":
      try {
        await prisma.note.delete({
          where: { id: noteId }
        });

        return res.status(204).end();
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Erreur lors de la suppression" });
      }

    default:
      return res.status(405).json({ message: "Méthode non autorisée" });
  }
}
