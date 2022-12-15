import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function main() {
  // make 10 users, with entries and notes assigned to them
  for (let i = 1; i <= 10; i++) {
    await prisma.user.upsert({
      where: {
        id: i,
      },
      update: {},
      create: {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });
  }

  for (let i = 1; i <= 50; i++) {
    await prisma.entry.upsert({
      where: {
        id: i,
      },
      update: {},
      create: {
        image_url: faker.image.imageUrl(),
        date: faker.date.recent(),
        userId: Math.ceil(Math.random() * 10),
      },
    });
  }

  for (let i = 1; i <= 100; i++) {
    await prisma.note.upsert({
      where: {
        id: i,
      },
      update: {},
      create: {
        content: faker.lorem.paragraph(5),
        entryId: Math.ceil(Math.random() * 50),
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
