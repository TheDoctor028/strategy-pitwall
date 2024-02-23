import {ITeam} from "./team.model";
import {ITrack} from "./track.model";

export interface IEvent {
    name: string;
    series?: string; // ? should this be optional
    /**
     * The duration of the race in minutes
     */
    duration: number;
    sessionStart: Date;
    sessionEnd: Date;
    /**
     * The of set from the session start in minutes until the green flag
     */
    greenFlagOffset: number;
    raceStart: Date;
    raceEnd: Date;
    /**
     * Race start time in sim (in-game) time.
     */
    raceStartSim: Date;
    raceEndSim: Date;
    /**
     * Time of the day offset in minutes got by raceStartSim - raceStart
     */
    todOffset: number;

    track: ITrack;
    team: ITeam;
}
