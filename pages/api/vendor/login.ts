import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Méthode non autorisée' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email et mot de passe requis.' });
    }

    const vendor = await prisma.vendor.findUnique({ where: { email } });

    if (!vendor) {
      return res.status(401).json({ success: false, message: "Prestataire introuvable." });
    }

    const isPasswordValid = await bcrypt.compare(password, vendor.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Mot de passe incorrect." });
    }

    return res.status(200).json({ 
      success: true, 
      validated: vendor.validated, 
      vendorId: vendor.id  // ➜ On renvoie bien l'ID pour le localStorage
    });

  } catch (error) {
    console.error('Erreur API Login:', error);
    return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
  }
}
