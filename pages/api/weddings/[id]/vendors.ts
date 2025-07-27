import { prisma } from "../../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    const vendors = await prisma.provider.findMany({
      where: { weddingId: parseInt(id) },
      orderBy: { id: "asc" },
    });
    return res.status(200).json(vendors);
  }

  res.status(405).json({ message: "Méthode non autorisée" });
}