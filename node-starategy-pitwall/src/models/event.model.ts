import {ITeam} from "./team.model";
import {ITrack} from "./track.model";
import {add} from "date-fns";

export interface IEvent {
    /**
     * Name of the event
     */
    name: string;
    /**
     * The series that the event is part of (For example: IMSA, VRS GT, etc.)
     */
    series?: string;
    /**
     * The duration of the race in minutes
     */
    duration: number;
    /**
     * The start time of the session (In UTC, IRL)
     */
    sessionStart: Date;
    /**
     * The end time of the session (In UTC, IRL)
     */
    sessionEnd: Date;
    /**
     * Minutes until the green flag from the session start
     */
    greenFlagOffset: number;
    /**
     * The start time of the race (In UTC, IRL)
     */
    raceStart: Date;
    /**
     * The end of the race (In UTC, IRL)
     */
    raceEnd: Date;
    /**
     * Race start time in sim (in-game) time.
     */
    raceStartSim: Date;
    /**
     * Race end time in sim (in-game) time.
     */
    raceEndSim: Date;
    /**
     * Time of the day offset in minutes got by raceStartSim - raceStart
     */
    todOffset: number;

    /**
     * The track that the event is held on
     */
    track: ITrack;
    /**
     * The team that is participating on this event
     */
    team: ITeam;
}

export class RaceEvent implements IEvent {
    constructor(
        public readonly name: string,
        public readonly series: string,
        public readonly duration: number,
        public readonly greenFlagOffset: number,
        public readonly sessionStart: Date,
        public readonly raceStartSim: Date,
        public readonly track: ITrack,
        public readonly team: ITeam,
    ) {}


    get raceStart(): Date {
        return add(new Date(this.raceStartSim), {minutes: this.greenFlagOffset});
    }

    get raceEnd(): Date {
        return add(new Date(this.raceStart), {minutes: this.duration});
    }

    get sessionEnd(): Date {
        return this.raceEnd;
    }

    get raceEndSim(): Date {
        return add(new Date(this.raceStartSim), {minutes: this.duration});
    }

    get todOffset(): number {
        return this.raceStartSim.getTime() - this.raceStart.getTime();
    }
}
