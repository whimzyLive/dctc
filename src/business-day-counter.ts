import {PublicHolidayRule} from './types/public-holiday-rule';
import {isDateListGuard} from './guards/is-date-list-guard';
import {isHolidayOnDatesRuleGuard} from './guards/is-holiday-on-dates-rule-guard';
import {isWeekDay} from './utils/is-week-day';
import {BaseDayCounter} from './base-day-counter';
import {dateToMonth} from './utils/date-to-month';
import {nthDayOfMonth} from './utils/nth-day-of-month';
import {dateToDay} from './utils/date-to-day';

export class BusinessDayCounter extends BaseDayCounter {
  /**
   * @param firstDate Start Date to lookup from
   * @param secondDate End Date to lookup upto
   * @returns Number of weekdays between given date range
   */
  static WeekdaysBetweenTwoDates(firstDate: Date, secondDate: Date): number {
    return BusinessDayCounter.GetDatesInRange(firstDate, secondDate).filter(
      date => isWeekDay(date)
    ).length;
  }

  /**
   * @param firstDate Start Date to lookup from
   * @param secondDate End Date to lookup from
   * @param publicHolidays List of public holiday dates or more complex rules to
   * consider when counting business days
   * @returns Number of business days between given date range
   */
  static BusinessDaysBetweenTwoDates(
    firstDate: Date,
    secondDate: Date,
    publicHolidays: Date[] | PublicHolidayRule
  ): number {
    if (isDateListGuard(publicHolidays)) {
      return BusinessDayCounter._CountBusinessDaysForListOfHolidays(
        firstDate,
        secondDate,
        publicHolidays
      );
    }

    if (!publicHolidays.holidays.length) {
      return BusinessDayCounter.WeekdaysBetweenTwoDates(firstDate, secondDate);
    }

    const {holidaysToOffset, calculatedPublicHolidays, workdays} =
      BusinessDayCounter._CountBusinessDaysForComplexHolidayPatterns(
        firstDate,
        secondDate,
        publicHolidays
      );

    const daysToOffset = BusinessDayCounter._CountDaysToOffset({
      holidaysToOffset,
      calculatedPublicHolidays,
      endDate: secondDate,
    });

    return workdays.length - daysToOffset;
  }

  /**
   * @internal Internal method to business calculate days between date range
   *
   * @description Counts Business days between two dates while considering
   * supplied list of public holidays.
   */
  private static _CountBusinessDaysForListOfHolidays(
    firstDate: Date,
    secondDate: Date,
    publicHolidays: Date[]
  ) {
    if (!publicHolidays.length) {
      return BusinessDayCounter.WeekdaysBetweenTwoDates(firstDate, secondDate);
    }
    const publicHolidaysStringList = publicHolidays.map((d: Date) =>
      d.toDateString()
    );

    return BusinessDayCounter.GetDatesInRange(firstDate, secondDate)
      .filter(date => isWeekDay(date))
      .filter(date => !publicHolidaysStringList.includes(date.toDateString()))
      .length;
  }

  /**
   * @internal Internal method to business calculate days between date range
   *
   * @description Counts Business days between two dates while also considering
   * public holiday patterns supplied as part of "publicHolidays".
   */
  private static _CountBusinessDaysForComplexHolidayPatterns(
    firstDate: Date,
    secondDate: Date,
    publicHolidays: PublicHolidayRule
  ): {
    calculatedPublicHolidays: Date[];
    holidaysToOffset: Date[];
    workdays: Date[];
  } {
    const holidaysToOffset: Date[] = [];
    const calculatedPublicHolidays: Date[] = [];

    const workdays = BusinessDayCounter.GetDatesInRange(firstDate, secondDate)
      .filter(date => {
        return !publicHolidays.holidays.some(holiday => {
          // when date rule is of type static dates, count weekdays
          if (isHolidayOnDatesRuleGuard(holiday)) {
            if (holiday[dateToMonth(date)]?.includes(date.getDate())) {
              calculatedPublicHolidays.push(date);
              if (publicHolidays.offsetToNextWeekday && !isWeekDay(date)) {
                holidaysToOffset.push(date);
              }
              return true;
            }
            return false;
          }

          // when date rule is of type complex date pattern, count weekdays
          const daysOfWeekRule = holiday[dateToMonth(date)]
            ? holiday[dateToMonth(date)]![dateToDay(date)]
            : [];

          const daysOfWeekMatches = daysOfWeekRule
            ?.map(dayOccurrence => nthDayOfMonth(date, dayOccurrence))
            .includes(date.getDate());

          if (daysOfWeekMatches) {
            calculatedPublicHolidays.push(date);
            if (publicHolidays.offsetToNextWeekday && !isWeekDay(date)) {
              holidaysToOffset.push(date);
            }
            return true;
          }
          return false;
        });
      })
      .filter(date => isWeekDay(date));

    return {
      workdays,
      holidaysToOffset,
      calculatedPublicHolidays,
    };
  }

  /**
   * @internal Internal method to calculate days to offset from total business days
   *
   * @description Offset may not be directly be redacted form total number of counted
   * business days in cases where public holiday falls on the weekend but the second date
   * that we are counting upto might not have enough business days available to offset from
   *
   */
  private static _CountDaysToOffset({
    endDate,
    calculatedPublicHolidays,
    holidaysToOffset,
  }: {
    endDate: Date;
    calculatedPublicHolidays: Date[];
    holidaysToOffset: Date[];
  }) {
    let daysToOffset = 0;
    while (holidaysToOffset.length && holidaysToOffset[0] instanceof Date) {
      const holiday = holidaysToOffset.shift()!;

      const hasDateInRangeToOffsetTo = BusinessDayCounter.GetDatesInRange(
        holiday,
        endDate
      ).filter(
        date =>
          isWeekDay(date) &&
          !calculatedPublicHolidays
            .map(holiday => holiday.toDateString())
            .includes(date.toDateString())
      );

      if (hasDateInRangeToOffsetTo.length) {
        daysToOffset++;
      }
    }

    return daysToOffset;
  }
}
