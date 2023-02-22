import {Day} from '../enums/day';

export function dateToDay(date: Date): Day {
  return date.toLocaleDateString('en', {
    weekday: 'long',
  }) as Day;
}
