// pages/api/vendors/respond.ts
import { prisma } from "@/lib/prisma";
import formidable from "formidable";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const form = formidable({
    uploadDir: "./public/uploads",
    keepExtensions: true,
    multiples: false
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Erreur formidable.parse:", err);
      return res.status(500).json({ message: "Erreur parsing" });
    }

    // Sécurise les champs : toujours récupérer une string simple
    const rawId = Array.isArray(fields.id) ? fields.id[0] : fields.id;
    const rawMessage = Array.isArray(fields.responseMessage)
      ? fields.responseMessage[0]
      : fields.responseMessage;

    const id = parseInt(rawId ?? "");
    const responseMessage = rawMessage ?? null;

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    let responseFile: string | null = null;

    if (files.file && Array.isArray(files.file)) {
      const filePath = files.file[0].filepath.replace("public", "");
      responseFile = filePath;
    }

    try {
      const updated = await prisma.quoteRequest.update({
        where: { id },
        data: {
          responseMessage: responseMessage || null,
          responseFile: responseFile || null
        }
      });

      return res.status(200).json(updated);
    } catch (error) {
      console.error("Erreur réponse devis:", error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  });
}
