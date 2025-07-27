// pages/api/admin/index.ts
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const pending = await prisma.userVendor.findMany({
      where: {
  custom: true,
  isApproved: false
},
        
      
    });
    return res.status(200).json(pending);
  }
  return res.status(405).end();
}
