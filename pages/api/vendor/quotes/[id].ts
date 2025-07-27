import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import {prisma} from '@/lib/prisma';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const vendorId = Number(req.headers['vendor-id']);
  const quoteId = Number(req.query.id);

  if (!vendorId) return res.status(401).json({ success: false, message: "Non autorisé" });

  const quote = await prisma.quoteRequest.findUnique({ where: { id: quoteId } });
  if (!quote || quote.vendorId !== vendorId) {
    return res.status(403).json({ success: false, message: "Accès refusé" });
  }

  if (req.method === 'POST') {
    const uploadDir = path.join(process.cwd(), '/public/uploads/quotes');
    const form = new formidable.IncomingForm({ uploadDir, keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(500).json({ success: false, message: 'Erreur upload' });

      const message = fields.message[0];
      const file = files.pdf ? files.pdf[0] : null;

      let pdfUrl = null;
      if (file) {
        const fileName = `${Date.now()}_${file.originalFilename}`;
        const newPath = path.join(uploadDir, fileName);
        fs.renameSync(file.filepath, newPath);
        pdfUrl = `/uploads/quotes/${fileName}`;
      }

      await prisma.quoteResponse.create({
        data: {
          quoteRequestId: quoteId,
          message,
          pdfUrl
        }
      });

      await prisma.quoteRequest.update({
        where: { id: quoteId },
        data: { status: 'Responded' }
      });

      return res.json({ success: true, message: "Réponse envoyée" });
    });
  } else {
    return res.status(405).json({ success: false, message: "Méthode non autorisée" });
  }
}
