import {BusinessDayCounter} from '@lib/business-day-counter';

describe('WeekdaysBetweenTwoDates', () => {
  const datasets = [
    ['2013-10-07', '2013-10-09', '1'],
    ['2013-10-05', '2013-10-14', '5'],
    ['2013-10-07', '2014-01-01', '61'],
    ['2013-10-07', '2013-01-05', '0'],
  ];

  const businessDateCounter = new BusinessDayCounter();

  it.each(datasets)(
    'returns weekday count for date range',
    (start: string, end: string, expectedValue: string) => {
      const weekDays = businessDateCounter.WeekdaysBetweenTwoDates(
        new Date(start),
        new Date(end)
      );
      expect(weekDays.toString()).toEqual(expectedValue);
    }
  );

  it('handles invalid date inputs', () => {
    const weekDays = businessDateCounter.WeekdaysBetweenTwoDates(
      new Date('something'),
      new Date('totally-random')
    );
    expect(weekDays).toEqual(0);
  });
});
