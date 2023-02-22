import {isValid} from 'date-fns';
import {Day} from '../enums/day';
import {dateToDay} from './date-to-day';

/**
 * @param date validates if the given date is valid weekday
 * @returns Strongly typed Weekday enum
 */
export function isWeekDay(date: Date): boolean {
  if (!isValid(date)) {
    throw new Error(`Input [${date}] is not a valid date.`);
  }
  const dayName = dateToDay(date);

  return (
    Object.values(Day).includes(dateToDay(date)) &&
    dayName !== Day.Saturday &&
    dayName !== Day.Sunday
  );
}
