import { PrismaClient } from '@prisma/client';
import { seedCars } from './seed/cars.seed';
import { seedTracks } from './seed/tracks.seed';
import { seedEvents } from './seed/events.seed';
import { seedTeams } from './seed/teams.seed';
const prisma = new PrismaClient();

async function main() {
  await seedCars(prisma);
  await seedTracks(prisma);
  await seedTeams(prisma);
  await seedEvents(prisma);
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
