// ✅ Fichier : pages/api/auth/login.ts
import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email et mot de passe requis" });

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.password !== password)
    return res.status(401).json({ message: "Identifiants incorrects" });

  res.status(200).json({ id: user.id, name: user.name, email, role: user.role });
}
