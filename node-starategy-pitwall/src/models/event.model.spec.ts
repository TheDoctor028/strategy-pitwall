import { RaceEvent } from './event.model';
import {ITeam, Team} from './team.model';
import { ITrack } from './track.model';
import {IStintsInfo, StintInfosByType, StintsInfoForCar} from "./stint-info.model";
import {StintType} from "../enums/stint-type.enum";
import {ICar} from "./car.model";
import {CarClass} from "../enums/car-class.enum";
import {IPitInfo, PitInfo} from "./pit-info.model";
import {add} from "date-fns";

describe('RaceEvent', () => {
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
    const target: StintInfosByType = {
        [StintType.NORMAL]: stintInfo,
    }
    const team = new Team("Test", [], car, target);
    const track: ITrack = {
        name: "Test",
        length: 10000,
    }

    let event: RaceEvent;

    beforeEach(() => {
        event = new RaceEvent('EventName', 'SeriesName',
            120, 30,
            new Date(2024, 1, 1, 12, 0, 0),
            new Date(2024, 1, 1, 8, 0, 0),
            track, team);
    });

    test('raceStart is calculated correctly', () => {
        const expectedRaceStart = new Date(2024, 1, 1, 12, 30, 0);
        expect(event.raceStart).toEqual(expectedRaceStart);
    });

    test('raceEnd is calculated correctly', () => {
        const expectedRaceEnd = new Date(2024, 1, 1, 14, 30, 0);
        expect(event.raceEnd).toEqual(expectedRaceEnd);
    });

    test('sessionEnd is equal to raceEnd', () => {
        const expectedSessionEnd = new Date(2024, 1, 1, 14, 30, 0);
        const raceEnd = event.raceEnd;
        expect(event.sessionEnd).toEqual(expectedSessionEnd);
        expect(event.sessionEnd).toEqual(raceEnd);
    });

    test('raceEndSim is calculated correctly', () => {
        const expectedRaceEndSim = new Date(2024, 1, 1, 10, 0, 0);
        expect(event.raceEndSim).toEqual(expectedRaceEndSim);
    });

    test('todOffset is calculated correctly', () => {
        const expectedTodOffset = -270
        expect(event.todOffset).toEqual(expectedTodOffset);
    });
});
