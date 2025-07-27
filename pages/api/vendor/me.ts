import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const vendorIdHeader = req.headers['vendor-id'];

    if (!vendorIdHeader) {
      return res.status(401).json({ success: false, message: "Non autorisé. ID manquant." });
    }

    const vendorId = parseInt(vendorIdHeader as string, 10);

    if (isNaN(vendorId)) {
      return res.status(400).json({ success: false, message: "ID prestataire invalide." });
    }

    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId }
    });

    if (!vendor) {
      return res.status(404).json({ success: false, message: "Prestataire introuvable." });
    }

    if (!vendor.validated) {
      return res.status(403).json({ success: false, message: "Votre compte n'est pas encore validé." });
    }

    const pendingQuotes = await prisma.quoteRequest.count({
      where: {
        vendorId: vendor.id,
        status: "Pending"
      }
    });

    const newMessages = await prisma.vendorMessage.count({
      where: {
        vendorId: vendor.id,
        receiverId: vendor.userId || undefined
      }
    });

    const data = {
      id: vendor.id,
      name: vendor.name,
      pendingQuotes,
      newMessages
    };

    return res.status(200).json({ success: true, vendor: data });

  } catch (error) {
    console.error('Erreur API /me:', error);
    return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
  }
}
