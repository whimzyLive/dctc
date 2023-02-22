import {BusinessDayCounter} from '@lib/business-day-counter';

describe('WeekdaysBetweenTwoDates', () => {
  const datasets = [
    ['2013-10-07', '2013-10-09', '1'],
    ['2013-10-05', '2013-10-14', '5'],
    ['2013-10-07', '2014-01-01', '61'],
    ['2013-10-07', '2013-01-05', '0'],
  ];

  it.each(datasets)(
    'returns weekday count for date range',
    (start: string, end: string, expectedValue: string) => {
      const weekDays = BusinessDayCounter.WeekdaysBetweenTwoDates(
        new Date(start),
        new Date(end)
      );
      expect(weekDays.toString()).toEqual(expectedValue);
    }
  );

  it('handles invalid date inputs', () => {
    const weekDays = BusinessDayCounter.WeekdaysBetweenTwoDates(
      new Date('something'),
      new Date('totally-random')
    );
    expect(weekDays).toEqual(0);
  });
});

describe('BusinessDaysBetweenTwoDates', () => {
  const datasets = [
    ['2013-10-07', '2013-10-09', '1'],
    ['2013-12-24', '2013-12-27', '0'],
    ['2013-10-07', '2014-01-01', '59'],
  ];

  const publicHolidays = [
    new Date('2013-12-25'),
    new Date('2013-12-26'),
    new Date('2014-01-01'),
  ];

  it.each(datasets)(
    'returns weekday count for date range',
    (start: string, end: string, expectedValue: string) => {
      const weekDays = BusinessDayCounter.BusinessDaysBetweenTwoDates(
        new Date(start),
        new Date(end),
        publicHolidays
      );
      expect(weekDays.toString()).toEqual(expectedValue);
    }
  );

  it('handles invalid date inputs', () => {
    const weekDays = BusinessDayCounter.WeekdaysBetweenTwoDates(
      new Date('something'),
      new Date('totally-random')
    );
    expect(weekDays).toEqual(0);
  });
});

describe('GetDatesInRange', () => {
  it('returns dates between two date ranges, within same months', () => {
    const dates = BusinessDayCounter.GetDatesInRange(
      new Date('2023-01-10'),
      new Date('2023-01-13')
    );

    expect(dates.length).toEqual(2);
    expect(dates.map(d => d.toLocaleDateString('en-AU'))).toEqual([
      '11/01/2023',
      '12/01/2023',
    ]);
  });

  it('returns dates between two date ranges, across different months', () => {
    const dates = BusinessDayCounter.GetDatesInRange(
      new Date('2023-01-28'),
      new Date('2023-02-02')
    );

    expect(dates.length).toEqual(4);
    expect(dates.map(d => d.toLocaleDateString('en-AU'))).toEqual([
      '29/01/2023',
      '30/01/2023',
      '31/01/2023',
      '01/02/2023',
    ]);
  });

  it('returns 0 when end date is smaller then start date', () => {
    const dates = BusinessDayCounter.GetDatesInRange(
      new Date('2023-01-02'),
      new Date('2023-01-01')
    );

    expect(dates.length).toEqual(0);
  });

  it('returns 0 when end date is same as start date', () => {
    const dates = BusinessDayCounter.GetDatesInRange(
      new Date('2023-01-02'),
      new Date('2023-01-02')
    );

    expect(dates.length).toEqual(0);
  });
});
