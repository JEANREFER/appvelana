import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // 1. Créer un utilisateur
  const user = await prisma.user.create({
    data: {
      name: "Demo User",
      email: "demo@example.com",
      password: "hashed-password",
      role: "organisateur"
    }
  });

  // 2. Créer un mariage
  const wedding = await prisma.wedding.create({
    data: {
      couple_name: "Alice & Bob",
      wedding_date: new Date('2025-09-01'),
      budget: 10000,
      created_by: user.id
    }
  });

  // 3. Tâches
  await prisma.task.createMany({
    data: [
      {
        title: "Réserver le lieu",
        weddingId: wedding.id,
        type: "Contacter"
      },
      {
        title: "Envoyer les invitations",
        weddingId: wedding.id,
        type: "Confirmer"
      }
    ]
  });

  // 4. Invités
  await prisma.guest.createMany({
    data: [
      {
        firstName: "Marie",
        lastName: "Dupont",
        email: "marie@example.com",
        weddingId: wedding.id,
        numGuests: 2
      },
      {
        firstName: "Jean",
        lastName: "Durand",
        email: "jean@example.com",
        weddingId: wedding.id,
        numGuests: 1
      }
    ]
  });

  // 5. Générer les Guestfamily à partir des Guests
  const guests = await prisma.guest.findMany({
    where: { weddingId: wedding.id }
  });

  for (const guest of guests) {
    for (let i = 0; i < guest.numGuests; i++) {
      await prisma.guestfamily.create({
        data: {
          nom: guest.lastName,
          prénom: `${guest.firstName}${i > 0 ? ` +${i}` : ''}`,
          age: 30,
          family: "Famille",
          centresInteret: "Non précisé",
          guestid: guest.id,
          weddingId: wedding.id,
          group: "Famille"
        }
      });
    }
  }

  // 6. Prestataires
  await prisma.provider.createMany({
    data: [
      {
        name: "DJ Sonic",
        category: "DJ",
        contact: "dj@sonic.com",
        price: 1200,
        weddingId: wedding.id
      },
      {
        name: "Fleurs Jolie",
        category: "fleuriste",
        contact: "contact@fleursjolie.fr",
        price: 500,
        weddingId: wedding.id
      }
    ]
  });

  // 7. Budget
  await prisma.budgetEntry.createMany({
    data: [
      {
        description: "Acompte lieu",
        amount: 2000,
        type: "depense",
        weddingId: wedding.id
      },
      {
        description: "Cadeau mariage",
        amount: 300,
        type: "revenu",
        weddingId: wedding.id
      }
    ]
  });

  // 8. Note
  await prisma.note.create({
    data: {
      content: "Penser à acheter les alliances.",
      weddingId: wedding.id
    }
  });
}

main()
  .then(() => console.log("✅ Données de démonstration insérées"))
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
