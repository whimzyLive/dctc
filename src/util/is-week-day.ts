import {Weekday} from '../enums/day';

/**
 * Type Guard for WeekDay
 * @param date validates if the given date is valid weekday
 * @returns Strongly typed Weekday enum
 */
export function isWeekDay(date: unknown): date is Weekday {
  const dayName = (date as Date).toLocaleDateString('en', {
    weekday: 'long',
  }) as Weekday;

  return Object.values(Weekday).includes(dayName);
}
