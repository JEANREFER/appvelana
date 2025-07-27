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
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
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

    if (!vendor) {
      return res.status(404).json({ success: false, message: 'Prestataire non trouvé' });
    }

    return res.status(200).json({ success: true, vendor });
  } catch (error) {
    console.error('Erreur API Vendor Public:', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
}
