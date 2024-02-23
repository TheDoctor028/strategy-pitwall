import {AvailabilityTimeWindow} from "./time-window.model";
import {StintInfosByType} from "./stint-info.model";

/**
 * Represents a driver in a team
 */
export interface IDriver {
    /**
     * The name of the driver
     */
    name: string;

    /**
     * The driver's offset of UTC time in hours
     */
    utcOffset: number;
    /**
     * The rating of the driver in the game (example: IRating for IRacing)
     */
    rating: number;

    /**
     * Preferred number of stints in a row by the driver
     */
    stintPreference: number;

    /**
     * The windows where the driver will be abel to drive, if null then always available
     */
    availability: AvailabilityTimeWindow[] | null;

    /**
     * The driver's stint info
     */
    stintsInfos: StintInfosByType;
}
