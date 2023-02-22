import {Day} from '@lib/enums/day';
import {Month} from '@lib/enums/month';
import {BusinessDayCounter} from '@lib/business-day-counter';

/**
 * Tests for Task One: Weekdays Between Two Dates
 *
 * @group BusinessDayCounter/WeekdaysBetweenTwoDates
 */
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
  /**
   * Tests for Task Two: Business Days Between Two Dates
   *
   * @group BusinessDayCounter/BusinessDaysBetweenTwoDates
   */
  describe('With Simple list of public holidays', () => {
    const datasets = [
      {
        startDate: new Date('2013-10-07'),
        endDate: new Date('2013-10-09'),
        expectedValue: 1,
      },
      {
        startDate: new Date('2013-12-24'),
        endDate: new Date('2013-12-27'),
        expectedValue: 0,
      },
      {
        startDate: new Date('2013-10-07'),
        endDate: new Date('2014-01-01'),
        expectedValue: 59,
      },
    ];

    it.each(datasets)(
      'returns weekday count for date range',
      ({startDate, endDate, expectedValue}) => {
        const weekDays = BusinessDayCounter.BusinessDaysBetweenTwoDates(
          startDate,
          endDate,
          [
            new Date('2013-12-25'),
            new Date('2013-12-26'),
            new Date('2014-01-01'),
          ]
        );
        expect(weekDays).toEqual(expectedValue);
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

  /**
   * Tests for Task Three: More Holidays (1)
   *
   * @group BusinessDayCounter/BusinessDaysBetweenTwoDates/1
   */
  describe('With Complex Same Day holiday pattern', () => {
    const dataSets = [
      // when there is no business day in the range to offset
      {
        startDate: new Date('2013-12-24'),
        endDate: new Date('2013-12-27'),
        offsetToNextWeekday: false,
        expectedValue: 0,
      },
      // when there are some business day in the range to offset
      {
        startDate: new Date('2016-12-20'),
        endDate: new Date('2016-12-28'),
        offsetToNextWeekday: false,
        expectedValue: 4,
      },
      {
        startDate: new Date('2016-12-20'),
        endDate: new Date('2016-12-28'),
        offsetToNextWeekday: true,
        expectedValue: 3,
      },
      // when there are some business day in the range to offset but end date is before the next available weekday
      {
        startDate: new Date('2016-12-20'),
        endDate: new Date('2016-12-27'),
        offsetToNextWeekday: false,
        expectedValue: 3,
      },
      {
        startDate: new Date('2016-12-20'),
        endDate: new Date('2016-12-27'),
        offsetToNextWeekday: true,
        expectedValue: 3,
      },
      {
        startDate: new Date('2016-12-20'),
        endDate: new Date('2016-12-27'),
        offsetToNextWeekday: true,
        expectedValue: 3,
      },
    ];
    it.each(dataSets)(
      '[$startDate to $endDate with offset $offsetToNextWeekday] for fixed holiday days - returns business day count [$expectedValue]',
      ({startDate, endDate, offsetToNextWeekday, expectedValue}) => {
        const bizDays = BusinessDayCounter.BusinessDaysBetweenTwoDates(
          startDate,
          endDate,
          {
            holidays: [
              // National holidays - NewYear Day, NewYear Holiday, Australia Day
              {[Month.January]: [1, 2, 26]},
              // National holidays - Christmas, Boxing day
              {[Month.December]: [25, 26]},
            ],
            offsetToNextWeekday,
          }
        );
        expect(bizDays).toEqual(expectedValue);
      }
    );

    it('handles invalid date inputs', () => {
      const weekDays = BusinessDayCounter.BusinessDaysBetweenTwoDates(
        new Date('something'),
        new Date('totally-random'),
        {
          holidays: [
            // National holidays - NewYear Day, NewYear Holiday, Australia Day
            {[Month.January]: [1, 2, 26]},
            // National holidays - Christmas, Boxing day
            {[Month.December]: [25, 26]},
          ],
        }
      );
      expect(weekDays).toEqual(0);
    });
  });

  /**
   * Tests for Task Three: More Holidays (2)
   *
   * @group BusinessDayCounter/BusinessDaysBetweenTwoDates/2
   */
  describe('With Complex Occurrence based holiday pattern', () => {
    const testDataset = [
      {
        startDate: new Date('2013-06-06'),
        endDate: new Date('2013-06-12'),
        offsetToNextWeekday: false,
        expectedValue: 2,
      },
      {
        startDate: new Date('2013-06-06'),
        endDate: new Date('2013-06-12'),
        offsetToNextWeekday: true,
        expectedValue: 1,
      },
    ];

    it.each(testDataset)(
      '[$startDate to $endDate with offset $offsetToNextWeekday] for recurring pattern - returns business day count [$expectedValue]',
      ({startDate, endDate, offsetToNextWeekday, expectedValue}) => {
        const bizDays = BusinessDayCounter.BusinessDaysBetweenTwoDates(
          startDate,
          endDate,
          {
            holidays: [
              {
                [Month.June]: {
                  // Queen's birthday - 2nd Monday occurrence  of June every year
                  [Day.Sunday]: [2],
                  // A random holiday that occurs on 4th Friday occurrence of December every year
                  [Day.Monday]: [2],
                },
              },
            ],
            offsetToNextWeekday,
          }
        );
        expect(bizDays).toEqual(expectedValue);
      }
    );

    it('handles invalid date inputs', () => {
      const weekDays = BusinessDayCounter.BusinessDaysBetweenTwoDates(
        new Date('something'),
        new Date('totally-random'),
        {
          holidays: [
            {
              [Month.June]: {
                // Queen's birthday - 2nd Monday occurrence  of June every year
                [Day.Sunday]: [2],
                // A random holiday that occurs on 4th Friday occurrence of December every year
                [Day.Monday]: [2],
              },
            },
          ],
        }
      );
      expect(weekDays).toEqual(0);
    });
  });
});
