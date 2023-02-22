import {Month} from '../enums/month';
export function dateToMonth(date: Date) {
  return date.toLocaleDateString('en', {
    month: 'long',
  }) as Month;
}
