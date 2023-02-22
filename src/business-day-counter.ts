import {eachDayOfInterval} from 'date-fns';
import {isWeekDay} from './util/is-week-day';

export class BusinessDayCounter {
  /**
   * @param firstDate Date to lookup weekdays from
   * @param secondDate Date to lookup weekdays to
   * @returns Number of weekdays between given date range
   */
  static WeekdaysBetweenTwoDates(firstDate: Date, secondDate: Date): number {
    return BusinessDayCounter.GetDatesInRange(firstDate, secondDate).filter(
      date => isWeekDay(date)
    ).length;
  }

  /**
   * @param start Date to start lookup from and excluding the given value
   * @param end Date to start lookup from and excluding the given value
   * @returns dates in between two given dates, 0 otherwise
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
