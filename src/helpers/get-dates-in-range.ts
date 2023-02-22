import {eachDayOfInterval} from 'date-fns';

/**
 * @param start Date to start lookup from and excluding the given value
 * @param end Date to start lookup from and excluding the given value
 * @returns dates in between two given dates, 0 otherwise
 */
export function getDatesInRange(start: Date, end: Date) {
  try {
    const datesInRange = eachDayOfInterval({
      start,
      end,
    });

    // return first and last of returned values,
    // as they represent the given stat and end date
    datesInRange.shift();
    datesInRange.pop();

    return datesInRange;
  } catch (err) {
    return [];
  }
}
