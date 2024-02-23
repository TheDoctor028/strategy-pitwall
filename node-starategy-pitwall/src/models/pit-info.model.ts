export interface IPitInfo {
    /**
     * The duration of the pit stop in seconds
     */
    duration: number;

    /**
     * The duration of the tire change in seconds, optional
     */
    tireChangeDuration?: number;

    /**
     * The duration of the full pit stop.
     */
    fullStopDuration: number;

    /**
     * Duration of the stop if not getting full fuel and not changing tires.
     */
    partialStopDuration: (fuelAmount: number, tireChange?: boolean) => number
}

/**
 * Information & calculations for pit stops
 */
export class PitInfo implements IPitInfo {
    constructor(
        public readonly duration: number,
        public readonly tireChangeDuration: number
    ) {
    }

    get fullStopDuration(): number {
        return this.duration + this.tireChangeDuration;
    }

    public partialStopDuration(fuelAmount: number, tireChange?: boolean): number {
        return this.duration + (tireChange ? this.tireChangeDuration : 0);
    }

}
