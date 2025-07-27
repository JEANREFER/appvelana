import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const vendorId = Number(req.headers['vendor-id']);
  if (!vendorId) return res.status(401).json({ success: false, message: "Non autorisé" });

  if (req.method === 'GET') {
    const discounts = await prisma.vendorDiscount.findMany({
      where: { vendorId },
      orderBy: { validUntil: 'asc' }
    });
    return res.json({ discounts });
  }

  if (req.method === 'POST') {
    const { title, description, discount, validUntil } = req.body;

    if (!title || !description || !discount || !validUntil) {
      return res.status(400).json({ success: false, message: "Champs manquants" });
    }

    await prisma.vendorDiscount.create({
      data: {
        vendorId,
        title,
        description,
        discount: parseFloat(discount),
        validUntil: new Date(validUntil),
      }
    });

    return res.json({ success: true, message: "Bon ajouté" });
  }

  return res.status(405).json({ success: false, message: "Méthode non autorisée" });
}
