import {isWeekDay} from './guards/type-guard';
import {getDatesInRange} from './helpers/get-dates-in-range';

export class BusinessDayCounter {
  /**
   * @param firstDate Date to lookup weekdays from
   * @param secondDate Date to lookup weekdays to
   * @returns Number of weekdays between given date range
   */
  WeekdaysBetweenTwoDates(firstDate: Date, secondDate: Date): number {
    return getDatesInRange(firstDate, secondDate).filter(date =>
      isWeekDay(date)
    ).length;
  }
}
