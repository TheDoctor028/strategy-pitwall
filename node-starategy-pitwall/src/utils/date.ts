/**
 * Offsets the time by the given offset in hours.
 * @param t The time to offset
 * @param offset The offset in hours
 * @returns The offset time
 */
export function offsetTime(t: Date, offset: number): Date {
    const tzDiff = offset * 60 + t.getTimezoneOffset();
    return new Date(t.getTime() + (tzDiff * 60 * 1000));
}
