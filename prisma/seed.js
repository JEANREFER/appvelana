import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Admin Test",
      email: "admin2@example.com",
      password: "admin123",
      role: "organisateur"
    }
  });

  const wedding = await prisma.wedding.create({
    data: {
      couple_name: "Alice & Bob",
      wedding_date: new Date("2025-06-20"),
      budget: 20000,
      created_by: user.id
    }
  });

  await prisma.task.createMany({
    data: [
      { title: "Réserver salle", type: "Contacter prestataire", weddingId: wedding.id },
      { title: "Envoyer invitations", type: "Confirmer prestataire", weddingId: wedding.id },
    ]
  });

  await prisma.guest.create({
    data: {
      firstName: "Jean",
      lastName: "Dupont",
      phone: "0601020303",
      email: "jean@mail.com",
      weddingId: wedding.id
    }
  });

  const vendor1 = await prisma.vendor.create({
    data: {
      name: "Salle des Fêtes Paris",
      siren: "123456789",
      email: "salleparis@example.com",
      password: "vendor123",
      city: "Paris",
      type: "Lieu",
      description: "Grande salle pouvant accueillir 200 invités.",
      price: 3500
    }
  });

  const vendor2 = await prisma.vendor.create({
    data: {
      name: "Délices Gourmands",
      siren: "987654321",
      email: "delices@example.com",
      password: "vendor123",
      city: "Lyon",
      type: "Traiteur",
      description: "Service traiteur gastronomique.",
      price: 2000
    }
  });

  await prisma.userVendor.create({
    data: {
      userId: user.id,
      weddingId: wedding.id,
      vendorId: vendor1.id,
      name: vendor1.name,
      custom: false
    }
  });

  await prisma.provider.create({
    data: {
      name: "Fleuriste Rose",
      category: "Décoration",
      contact: "06 88 88 88 88",
      price: 500,
      weddingId: wedding.id
    }
  });

  await prisma.budgetEntry.create({
    data: {
      description: "Acompte salle",
      amount: 1000,
      type: "depense",
      weddingId: wedding.id
    }
  });

  await prisma.note.create({
    data: {
      content: "Prévoir DJ pour la soirée",
      weddingId: wedding.id
    }
  });
}

main()
  .then(() => console.log("✅ Seed completed"))
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
