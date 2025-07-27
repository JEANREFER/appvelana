	// pages/api/organizer/weddings.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (!session || session.user.role !== 'organisateur') {
    return res.status(401).json({ error: 'Non autorisé' })
  }

  const weddings = await prisma.wedding.findMany({
   where: { created_by: parseInt(session.user.id as string) },
    orderBy: { wedding_date: 'asc' },
  })

  res.status(200).json(weddings)
}
