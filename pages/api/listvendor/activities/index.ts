import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const vendorId = Number(req.headers['vendor-id']);
  if (!vendorId) return res.status(401).json({ success: false });

  if (req.method === 'GET') {
    const activities = await prisma.vendorActivity.findMany({
      where: { vendorId }
    });
    return res.json({ activities });
  }

  if (req.method === 'POST') {
    const { title, description, price, location } = req.body;
    await prisma.vendorActivity.create({
      data: { vendorId, title, description, price: parseFloat(price), location }
    });
    return res.json({ success: true });
  }

  res.status(405).end();
}
