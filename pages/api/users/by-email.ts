import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email requis" });

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.role !== "marie") {
      return res.status(404).json({ message: "Utilisateur marié(e) non trouvé" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Erreur recherche email :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
}
