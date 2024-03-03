import { PrismaClient, Event } from '@prisma/client';

const events: Partial<Event>[] = [];

export async function seedEvents(prisma: PrismaClient) {
  for (const event of events) {
    await prisma.event.create({
      data: {
        name: event.name,
        series: event.series,
        duration: event.duration,
        greenFlagOffset: event.greenFlagOffset,
        sessionStart: event.sessionStart,
        raceStartSim: event.raceStartSim,
        trackId: '',
        teamId: '',
      },
    });
  }
}
