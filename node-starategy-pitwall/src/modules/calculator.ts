import {StintType} from "../enums/stint-type.enum";
import {IEvent} from "../models/event.model";
import {Stint} from "../models/stint.model";
import {add} from "date-fns";

export class StrategyCalculator {
    constructor(
        public readonly event: IEvent
    ) {
    }

    public generateAvgStrategyTable(): Stint[] {
        const stints: Stint[] = []
        const targetLapCount = (this.event.duration * 60) / this.event.team.targetStintInfos[StintType.NORMAL].lapTimeWithPit;
        const targetStintCount = targetLapCount / this.event.team.targetStintInfos[StintType.NORMAL].lapCount;
        const targetStintCountRound = Math.round(targetStintCount);
        const lastStintLapCount = Math.round(
            this.event.team.avgDriver.stintsInfos[StintType.NORMAL].lapCount
            *
            targetStintCount - Math.floor(targetStintCount)
        );

        // Generate the full stints
        for (let i = 0; i < targetStintCountRound - 1; i++) {
            const s = new Stint(
                i + 1, StintType.NORMAL, this.event.team.targetStintInfos,
                add(new Date(this.event.raceStart),
                    {seconds: this.event.team.targetStintInfos[StintType.NORMAL].trackTimeWithPit * i}),
                this.event.team.avgDriver);
            stints.push(s);
        }
        // Generate the last stint
        stints.push(new Stint(
            targetStintCountRound,
            StintType.NORMAL,
            this.event.team.targetStintInfos,
            stints[stints.length - 1].endTime,
            this.event.team.avgDriver,
            lastStintLapCount
        ));

        return stints;
    }

}
