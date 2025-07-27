import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import {prisma} from '@/lib/prisma';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user?.email) {
    return res.status(401).json({ error: 'Non autorisé (session manquante)' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    if (req.method === 'GET') {
      return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
		company: user.company,
        city: user.city,
      });
    }

    if (req.method === 'PUT') {
      const { name, company, city } = req.body;
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: { name, company, city },
      });
      return res.status(200).json(updatedUser);
    }

    res.setHeader('Allow', ['GET', 'PUT']);
    return res.status(405).end(`Méthode ${req.method} non autorisée`);
  } catch (error) {
    console.error('Erreur serveur /api/organizer/profile :', error);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}
