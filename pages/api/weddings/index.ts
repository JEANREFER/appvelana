// pages/api/weddings/index.ts

import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  try {
    const weddings = await prisma.wedding.findMany({
      include: {
        userAccesses: {
          include: { user: true },
        },
      },
    });

    res.status(200).json(weddings); // ← doit renvoyer un tableau
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}
