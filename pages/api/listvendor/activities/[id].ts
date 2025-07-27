import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const vendorId = Number(req.headers['vendor-id']);
  const activityId = Number(req.query.id);

  if (!vendorId) {
    return res.status(401).json({ success: false, message: "Vendor ID manquant" });
  }

  const activity = await prisma.vendorActivity.findUnique({ where: { id: activityId } });

  if (!activity) {
    return res.status(404).json({ success: false, message: "Activité introuvable" });
  }

  if (activity.vendorId !== vendorId) {
    return res.status(403).json({ success: false, message: "Accès non autorisé" });
  }

  // ----- Gestion de la suppression -----
  if (req.method === 'DELETE') {
    await prisma.vendorActivity.delete({ where: { id: activityId } });
    return res.json({ success: true, message: "Activité supprimée" });
  }

  // ----- Gestion de la mise à jour -----
  if (req.method === 'PUT') {
    const { title, description, price, location } = req.body;

    if (!title || !description || !price || !location) {
      return res.status(400).json({ success: false, message: "Champs manquants" });
    }

    await prisma.vendorActivity.update({
      where: { id: activityId },
      data: {
        title,
        description,
        price: parseFloat(price),
        location
      }
    });

    return res.json({ success: true, message: "Activité mise à jour" });
  }

  // ----- Méthode non autorisée -----
  return res.status(405).json({ success: false, message: "Méthode non autorisée" });
}
