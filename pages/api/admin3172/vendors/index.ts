import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    console.log("Requête API /vendors : recherche des prestataires non validés");

    const pending = await prisma.vendor.findMany({
      where: { validated: false },
    });

    console.log("Prestataires trouvés :", pending.length);

    return res.status(200).json(pending);
  }

  return res.status(405).end();
}
