import {ICar} from "../models/car.model";
import {CarClass} from "../enums/car-class.enum";
import {IPitInfo, PitInfo} from "../models/pit-info.model";
import {IStintsInfo, StintInfosByType, StintsInfoForCar} from "../models/stint-info.model";
import {add} from "date-fns";
import {ITrack} from "../models/track.model";
import {StintType} from "../enums/stint-type.enum";
import {Team} from "../models/team.model";
import {RaceEvent} from "../models/event.model";
import {StrategyCalculator} from "./calculator";

describe('Calculator', () => {
    it('should generate the base strategy table', () => {
        const now = new Date();

        const car: ICar ={
            name: "Car",
            class: CarClass.GT3,
            fuelTankSize: 89,
        }
        const pitInfo: IPitInfo = new PitInfo(60, 0);
        const stintInfo: IStintsInfo = new StintsInfoForCar(car, [
            {
                timeOfDay: "AllDay",
                lap: {
                    time: 95,
                    fuel: 3.35,
                },
                start: now,
                end: add(now, {hours: 1}),
            }
        ], pitInfo);
        const track: ITrack = {
            name: "Test",
            length: 10000,
        }
        const target: StintInfosByType = {
            [StintType.NORMAL]: stintInfo,
        }
        const team = new Team("Test", [], car, target);

        const event = new RaceEvent("Test", "", 6 * 60, 15, now, now, track, team);

        const c = new StrategyCalculator(event);
    })

});