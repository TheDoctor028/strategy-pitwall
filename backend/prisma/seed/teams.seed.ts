import { PrismaClient, Team } from '@prisma/client';

const teams: Partial<Team>[] = [
  {
    name: 'Red Bull Racing',
  },
];

export async function seedTeams(prisma: PrismaClient) {
  for (const team of teams) {
    const c = await prisma.car.create({
      data: { name: 'Peugeot 9X8', class: 'GTP', fuelTankSize: 80 },
    });

    await prisma.team.create({
      data: {
        name: team.name,
        carId: c.id,
      },
    });
  }
}
