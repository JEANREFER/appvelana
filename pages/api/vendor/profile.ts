import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";
import sharp from "sharp";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { vendorId } = req.query;

  if (!vendorId) {
    return res.status(400).json({ error: "vendorId requis" });
  }

  const vendorIdInt = parseInt(vendorId as string, 10);
  if (isNaN(vendorIdInt)) {
    return res.status(400).json({ error: "vendorId invalide" });
  }

  if (req.method === "GET") {
    try {
      const vendor = await prisma.vendor.findUnique({
        where: { id: vendorIdInt }
      });
      if (!vendor) return res.status(404).json({ error: "Prestataire non trouvé" });
      return res.status(200).json(vendor);
    } catch (error) {
      console.error("Erreur GET /vendor/profile:", error);
      return res.status(500).json({ error: "Erreur serveur", details: String(error) });
    }
  }

  if (req.method === "PUT") {
    const uploadDir = path.join(process.cwd(), "/public/uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = new IncomingForm({
      multiples: false,
      uploadDir,
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Erreur parsing form:", err);
        return res.status(500).json({ error: "Erreur parsing form" });
      }

      console.log("📦 FIELDS:", fields);
      console.log("🖼️ FILES:", files);

      try {
        const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
        const city = Array.isArray(fields.city) ? fields.city[0] : fields.city;
        const type = Array.isArray(fields.type) ? fields.type[0] : fields.type;
        const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
        const price = Array.isArray(fields.price) ? fields.price[0] : fields.price;
        const website = Array.isArray(fields.website) ? fields.website[0] : fields.website;
        const contact = Array.isArray(fields.contact) ? fields.contact[0] : fields.contact;

        if (!name || !city || !description || !price || !type) {
          return res.status(400).json({ error: "Champs requis manquants" });
        }

        let imageUrl: string | undefined = undefined;
        const receivedFile = files?.file;
        if (receivedFile) {
          const file = Array.isArray(receivedFile) ? receivedFile[0] : receivedFile;
          if (file?.filepath) {
            const originalPath = file.filepath;
            const resizedFileName = `resized-${Date.now()}-${path.basename(file.originalFilename || file.filepath)}`;
			const outputPath = path.join(uploadDir, resizedFileName);

            console.log("🔧 Redimensionnement de:", originalPath);

            // Redimensionnement avec Sharp
            await sharp(originalPath)
              .resize({ width: 800 }) // forcer une largeur max
              .toFormat('jpeg')
              .jpeg({ quality: 80 })
              .toFile(outputPath);

            console.log("✅ Image redimensionnée :", outputPath);

            // Définir l'URL pour la BDD
            imageUrl = `/uploads/${resizedFileName}`;

            // Supprimer l'original
            fs.unlinkSync(originalPath);
          }
        }

        const updatedVendor = await prisma.vendor.update({
          where: { id: vendorIdInt },
          data: {
            name,
            city,
            type,
            description,
            price: parseFloat(price),
            website: website || undefined,
            contact: contact || undefined,
            ...(imageUrl && { imageUrl }),
          },
        });

        console.log("✅ Prestataire mis à jour avec succès");
        return res.status(200).json(updatedVendor);
      } catch (error) {
        console.error("Erreur mise à jour prestataire:", error);
        return res.status(500).json({ error: "Erreur serveur interne", details: String(error) });
      }
    });

    return;
  }

  return res.status(405).json({ error: "Méthode non autorisée" });
}
