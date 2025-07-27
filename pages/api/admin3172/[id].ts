

// pages/api/admin/vendors/[id].ts
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { isApproved } = req.body;
    const updated = await prisma.userVendor.update({
      where: { id: parseInt(id) },
      data: { isApproved }
    });
    return res.status(200).json(updated);
  }

  if (req.method === "DELETE") {
    await prisma.userVendor.delete({ where: { id: parseInt(id) } });
    return res.status(204).end();
  }

  return res.status(405).end();
}
