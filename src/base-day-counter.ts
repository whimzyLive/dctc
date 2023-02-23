import {eachDayOfInterval} from 'date-fns';

export abstract class BaseDayCounter {
  /**
   * @param start Date to start lookup from and excluding the given value
   * @param end Date to start lookup from and excluding the given value
   * @returns Dates in between two given dates, 0 otherwise
   */
  static GetDatesInRange(start: Date, end: Date) {
    try {
      const [, ...inBetween] = eachDayOfInterval({
        start,
        end,
      });

      // remove last date
      inBetween.pop();

      return inBetween;
    } catch (err) {
      return [];
    }
  }
}
