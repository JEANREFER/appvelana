import { NextApiRequest, NextApiResponse } from 'next';
import {prisma} from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const vendorId = Number(req.headers['vendor-id']);
  if (!vendorId) return res.status(401).json({ success: false, message: "Non autorisé" });

  if (req.method === 'GET') {
    const quotes = await prisma.quoteRequest.findMany({
      where: { vendorId },
      include: {
        user: true,
        response: true
      },
      orderBy: { createdAt: 'desc' }
    });

    const formattedQuotes = quotes.map(q => ({
      id: q.id,
      userName: q.user.name,
      message: q.message,
      status: q.status,
      responsePdf: q.response?.pdfUrl || null
    }));

    return res.json({ quotes: formattedQuotes });
  }

  return res.status(405).json({ success: false, message: "Méthode non autorisée" });
}
