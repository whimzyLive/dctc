import {getDatesInRange} from '@lib/helpers/get-dates-in-range';

test('returns dates between two date ranges, within same months', () => {
  const dates = getDatesInRange(new Date('2023-01-10'), new Date('2023-01-13'));

  expect(dates.length).toEqual(2);
  expect(dates.map(d => d.toLocaleDateString('en-AU'))).toEqual([
    '11/01/2023',
    '12/01/2023',
  ]);
});

test('returns dates between two date ranges, across different months', () => {
  const dates = getDatesInRange(new Date('2023-01-28'), new Date('2023-02-02'));

  expect(dates.length).toEqual(4);
  expect(dates.map(d => d.toLocaleDateString('en-AU'))).toEqual([
    '29/01/2023',
    '30/01/2023',
    '31/01/2023',
    '01/02/2023',
  ]);
});

test('returns 0 when end date is smaller then start date', () => {
  const dates = getDatesInRange(new Date('2023-01-02'), new Date('2023-01-01'));

  expect(dates.length).toEqual(0);
});

test('returns 0 when end date is same as start date', () => {
  const dates = getDatesInRange(new Date('2023-01-02'), new Date('2023-01-02'));

  expect(dates.length).toEqual(0);
});
