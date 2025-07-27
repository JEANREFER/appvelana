import { NextApiRequest, NextApiResponse } from 'next';
import {prisma} from '@/lib/prisma';  // Ton instance Prisma

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.json({ success: false, message: "Utilisateur introuvable." });

  const vendor = await prisma.vendor.findUnique({ where: { userId: user.id } });
  if (!vendor) return res.json({ success: false, message: "Accès réservé aux prestataires." });

  // Vérifie le mot de passe ici (bcrypt ou autre)

  return res.json({ success: true });
}
