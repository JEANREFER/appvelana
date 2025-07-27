import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Méthode non autorisée' });
  }

  try {
    const { name, siren, email, password } = req.body;

    if (!name || !siren || !email || !password) {
      return res.status(400).json({ success: false, message: 'Champs manquants' });
    }

    const existingVendor = await prisma.vendor.findFirst({
      where: { OR: [{ email }, { siren }] }
    });

    if (existingVendor) {
      return res.status(409).json({ success: false, message: "Email ou SIREN déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.vendor.create({
  data: {
    name,
    siren,
    email,
    password: hashedPassword,
    rating: 0,
    ratings: 0
	  }
	});

    return res.status(201).json({ success: true, message: 'Prestataire enregistré avec succès' });

  } catch (error: any) {
  console.error('Erreur API Register:', error.message);
  console.error(error);
  return res.status(500).json({ success: false, message: 'Erreur interne du serveur', error: error.message });
  }

}
