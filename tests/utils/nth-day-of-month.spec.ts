import {nthDayOfMonth} from '@lib/utils/nth-day-of-month';

test('nthDayOfMonth returns correct date 14 for 2nd Monday of January 2013', () => {
  const day = nthDayOfMonth(new Date('2013-01-07'), 2);

  expect(day).toEqual(14);
});

test('nthDayOfMonth returns -1 for invalid date input', () => {
  const day = nthDayOfMonth(new Date('invalid date'), 2);

  expect(day).toEqual(-1);
});
