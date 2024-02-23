import {IDriver} from "./driver.model";
import {IStintsInfo, StintInfosByType} from "./stint-info.model";
import {offsetTime} from "../utils/date";

export class Stint {
    constructor(
        public readonly index: number,
        public readonly stintType: string,
        protected targetInfos: StintInfosByType,
        public readonly startTime: Date,
        public readonly driver: IDriver,
        protected readonly _targetLapCount?: number
    ) {
    }

    get lapCount(): number {
        return this._targetLapCount || this.getDriverStintInfo().lapCount
    }

    get lapCountDiffToTarget(): number {
        return this.lapCount - (this._targetLapCount || this.getTargetLapCount().lapCount);
    }

    get stintTime(): number {
        return this.getDriverStintInfo().trackTimeWithPit * this.lapCount;
    }

    get stintTimeDiffToTarget(): number {
        return this.stintTime * this.lapCount - this.getTargetLapCount().trackTimeWithPit * this.getTargetLapCount().lapCount;
    }

    get endTime(): Date {
        return new Date(this.startTime.getTime() + this.stintTime);
    }

    get localStartTime(): Date {
        return offsetTime(this.startTime, this.driver.utcOffset);
    }

    get localEndTime(): Date {
        return offsetTime(this.endTime, this.driver.utcOffset);
    }


    private getTargetLapCount(): IStintsInfo {
        if (!this.targetInfos[this.stintType])
            throw new Error(`Stint type ${this.stintType} not found for targetStintInfos`);
        return this.targetInfos[this.stintType];
    }

    private getDriverStintInfo(): IStintsInfo {
        if (!this.driver.stintsInfos[this.stintType])
            throw new Error(`Stint type ${this.stintType} not found for driver ${this.driver.name}`);
        return this.driver.stintsInfos[this.stintType];
    }

}
