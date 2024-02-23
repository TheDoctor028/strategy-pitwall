import {IEvent} from "./models/event.model";
import {ITeam} from "./models/team.model";
import {Stint} from "./models/stint.model";
import {StintType} from "./enums/stint-type.enum";

export class StrategyCalculator {
    constructor(
        public readonly event: IEvent,
        public readonly team: ITeam
    ) {
    }

    public generateAvgStrategyTable(): Stint[] {
        const stints: Stint[] = []
        const targetStintCount = this.event.duration / this.team.targetStintInfos[StintType.NORMAL].lapTimeWithPit;
        const targetStintCountRound = Math.round(targetStintCount);
        const lastStintRatio = targetStintCount - Math.floor(targetStintCount);

        // Generate the full stints
        for (let i = 0; i < targetStintCountRound - 1; i++) {
            const s = new Stint(i + 1, StintType.NORMAL, this.team.targetStintInfos, this.event.raceStart, this.team.avgDriver);
            stints.push(s);
        }
        // Generate the last stint
        stints.push(new Stint(
            targetStintCountRound,
            StintType.NORMAL,
            this.team.targetStintInfos,
            stints[stints.length - 1].endTime,
            this.team.avgDriver,
            this.team.avgDriver.stintsInfos[StintType.NORMAL].lapCount * lastStintRatio
        ));

        return stints;
    }

}
