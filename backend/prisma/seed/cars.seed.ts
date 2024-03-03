import { PrismaClient, Car } from '@prisma/client';

const cars: Partial<Car>[] = [
  {
    name: 'Porsche 911 RSR',
    class: 'GTE',
    fuelTankSize: 97,
  },
];

export async function seedCars(prisma: PrismaClient) {
  for (const car of cars) {
    await prisma.car.create({
      data: {
        name: car.name,
        class: car.class,
        fuelTankSize: car.fuelTankSize,
      },
    });
  }
}
