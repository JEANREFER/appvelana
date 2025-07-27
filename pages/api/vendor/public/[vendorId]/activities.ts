import { NextApiRequest, NextApiResponse } from 'next';
import {prisma} from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const vendorId = Number(req.query.vendorId);

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Méthode non autorisée' });
  }

  if (!vendorId) {
    return res.status(400).json({ success: false, message: 'vendorId manquant' });
  }

  try {
    const activities = await prisma.vendorActivity.findMany({
      where: { vendorId },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        location: true,
        imageUrls: true
      }
    });

    return res.status(200).json({ success: true, activities });
  } catch (error) {
    console.error('Erreur API Activities Public:', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
}
