export interface ITrack {
    name: string;
    /**
     * The layout of the track just an extra note for now, the name should be uniq for all tracks.
     */
    layout?: string;
    /**
     * The length of the track in meters.
     */
    length: number;
}
