import { NextApiRequest, NextApiResponse } from 'next';
import {prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Méthode non autorisée' });
  }

  const { type } = req.query;

  try {
    const vendors = await prisma.vendor.findMany({
      where: {
        validated: true,
        ...(type && type !== 'all' ? { type: String(type) } : {})
      },
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        city: true,
        type: true,
        description: true,
        price: true,
        imageUrl: true
      }
    });

    return res.status(200).json({
      success: true,
      count: vendors.length,
      vendors
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des prestataires :", error);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
}
