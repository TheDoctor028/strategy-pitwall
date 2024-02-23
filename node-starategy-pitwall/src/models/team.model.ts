import {ICar} from "./car.model";
import {IDriver} from "./driver.model";
import {StintInfosByType} from "./stint-info.model";
import {StintType} from "../enums/stint-type.enum";

export interface ITeam {
    name: string;
    drivers: IDriver[];
    car: ICar;
    targetStintInfos: StintInfosByType;

    avgRating: number;
    avgDriver: IDriver;
}

export class Team implements ITeam {
    constructor(
        public readonly name: string,
        public readonly drivers: IDriver[],
        public car: ICar,
        public targetStintInfos: StintInfosByType,
    ) {
    }

    get avgRating(): number {
        return this.drivers.reduce((acc, d) => acc + d.rating, 0) / this.drivers.length;
    }

    get avgDriver(): IDriver {
        return {
            availability: null,
            name: `Team Average`,
            rating: -1,
            stintPreference: -1,
            stintsInfos: {[StintType.NORMAL]: this.targetStintInfos[StintType.NORMAL]},
            utcOffset: 0
        }
    }
}
