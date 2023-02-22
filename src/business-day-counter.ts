import {eachDayOfInterval} from 'date-fns';
import {isWeekDay} from './util/is-week-day';

export class BusinessDayCounter {
  /**
   * @param firstDate Start Date to lookup from
   * @param secondDate End Date to lookup upto
   * @returns Number of weekdays between given date range
   */
  static WeekdaysBetweenTwoDates(firstDate: Date, secondDate: Date): number {
    return BusinessDayCounter.GetDatesInRange(firstDate, secondDate).filter(
      date => isWeekDay(date)
    ).length;
  }

  /**
   *
   * @param firstDate Start Date to lookup from
   * @param secondDate End Date to lookup from
   * @param publicHolidays Public holidays to exclude
   * @returns Number of business days between given date range
   */
  static BusinessDaysBetweenTwoDates(
    firstDate: Date,
    secondDate: Date,
    publicHolidays: Date[]
  ): number {
    const publicHolidaysStringList = publicHolidays.map(d => d.toDateString());

    return BusinessDayCounter.GetDatesInRange(firstDate, secondDate)
      .filter(date => isWeekDay(date))
      .filter(date => !publicHolidaysStringList.includes(date.toDateString()))
      .length;
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
