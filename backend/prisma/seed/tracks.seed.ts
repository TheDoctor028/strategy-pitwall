import { PrismaClient, Track } from '@prisma/client';

const tracks: Partial<Track>[] = [
  {
    name: 'Silverstone',
    layout: 'Grand Prix',
    length: 5891,
  },
];

export async function seedTracks(prisma: PrismaClient) {
  for (const track of tracks) {
    await prisma.track.create({
      data: {
        name: track.name,
        layout: track.layout,
        length: track.length,
      },
    });
  }
}
