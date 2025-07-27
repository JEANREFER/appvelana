import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const vendorId = Number(req.headers['vendor-id']);
  const discountId = Number(req.query.id);

  if (!vendorId) return res.status(401).json({ success: false, message: "Non autorisé" });

  const discount = await prisma.vendorDiscount.findUnique({ where: { id: discountId } });
  if (!discount || discount.vendorId !== vendorId) {
    return res.status(403).json({ success: false, message: "Accès refusé" });
  }

  if (req.method === 'DELETE') {
    await prisma.vendorDiscount.delete({ where: { id: discountId } });
    return res.json({ success: true, message: "Bon supprimé" });
  }

  if (req.method === 'PUT') {
    await prisma.vendorDiscount.update({
      where: { id: discountId },
      data: { isActive: !discount.isActive }
    });
    return res.json({ success: true, message: "Statut modifié" });
  }

  return res.status(405).json({ success: false, message: "Méthode non autorisée" });
}
