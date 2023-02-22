import {isWeekDay} from '@lib/utils/is-week-day';

test('isWeekDay correctly validates when given date falls on weekday', () => {
  const weekDay = isWeekDay(new Date('2023-02-03'));
  expect(weekDay).toBeTruthy();
});

test('isWeekDay correctly validates when given date falls on weekend', () => {
  const weekDay = isWeekDay(new Date('2023-02-04'));
  expect(weekDay).toBeFalsy();
});

test('isWeekDay correctly validates invalid date input', () => {
  const weekDay = () => isWeekDay(new Date('invalid date'));
  expect(weekDay).toThrowError('Input [Invalid Date] is not a valid date');
});
