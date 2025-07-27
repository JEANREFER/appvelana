// pages/api/admin3172/login.ts
import { prisma } from "@/lib/prisma"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" })
  }

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis" })
  }

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Identifiants incorrects" })
  }

  return res.status(200).json({ id: user.id, name: user.name, email: user.email, role: user.role })
}
