import {Weekday} from '../enums/day';

export function isWeekDay(date: unknown): date is Weekday {
  const dayName = (date as Date).toLocaleDateString('en', {
    weekday: 'long',
  }) as Weekday;

  return Object.values(Weekday).includes(dayName);
}
