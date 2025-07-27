
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const weddingId = parseInt(req.query.weddingId as string);

  if (isNaN(weddingId)) {
    return res.status(400).json({ error: 'weddingId requis' });
  }

  const guestfamily = await prisma.guestfamily.findMany({
    where: { weddingId },
    orderBy: { nom: 'asc' },
  });

  res.status(200).json(guestfamily);
}

