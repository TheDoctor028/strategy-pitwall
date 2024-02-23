/**
 * Represents a time frame with a start and end date.
 */
export type TimeWindow = {
    start: Date,
    end: Date
}

export type AvailabilityTimeWindow = {
    timeFrame: TimeWindow,
    /**
     * Whether the time frame is available or not.
     */
    available: boolean
}
