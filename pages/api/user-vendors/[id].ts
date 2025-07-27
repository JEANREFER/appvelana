import { prisma } from "../../../lib/prisma";

// pages/api/user-vendors/[id].ts
//import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const data = req.body;
    const updated = await prisma.userVendor.update({
      where: { id: parseInt(id) },
      data
    });
    return res.status(200).json(updated);
  }

  return res.status(405).end();
}
