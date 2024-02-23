import {Lap} from "./lap.model";
import {ICar} from "./car.model";
import {IPitInfo} from "./pit-info.model";

/**
 * Time Of the Day factor for Lap times.
 *
 */
export interface ITODFactor {
    /**
     * The name of the TOD
     */
    timeOfDay: string;
    /**
     * The lap that is avg. don in this conditions
     */
    lap: Lap;
    /**
     * The start time of the TOD
     */
    start: Date;
    /**
     * The end time of the TOD
     */
    end: Date;
}

export interface IStintsInfo {
    lap: Lap;

    lapCount: number;
    lapTimeWithPit: number;
    trackTime: number;
    trackTimeWithPit: number;
    fuelPerStint: number;
}

export type StintInfosByType = { [stintType: string]: IStintsInfo }

export class StintsInfoForCar implements IStintsInfo {
    constructor(
        protected readonly car: ICar,
        protected readonly todFactors: Array<ITODFactor>,
        protected readonly pitInfo: IPitInfo
    ) {
    }

    get lap(): Lap {
        return CalculateAvgLap(this.todFactors);
    }


    get lapCount(): number {
        return this.car.fuelTankSize / this.lap.fuel;
    }

    get lapTimeWithPit(): number {
        return this.lap.time + (this.pitInfo.duration / this.lapCount);
    }

    get trackTime(): number {
        return this.lap.time * this.lapCount;
    }

    get trackTimeWithPit(): number {
        return this.trackTime + this.pitInfo.duration;
    }

    get fuelPerStint(): number {
        return this.lap.fuel * this.lapCount;
    }

}

export function CalculateAvgLap(todFactor: ITODFactor[]): Lap {
    return {
        fuel: todFactor.map((f) => f.lap.fuel).reduce((acc, n) => acc + n, 0),
        time: todFactor.map((f) => f.lap.time).reduce((acc, n) => acc + n, 0)
    };
}
