import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "Champs requis manquants" });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    // Créer l'utilisateur
    const newUser = await prisma.user.create({
      data: { name, email, password, role },
    });

    

    // Répondre avec les infos utiles
    res.status(200).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,

    });

  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
}
