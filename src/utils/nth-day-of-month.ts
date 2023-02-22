import {addWeeks, getDate, getDay, setDay, startOfMonth} from 'date-fns';

export function nthDayOfMonth(
  firstOccurrenceDate: Date,
  dayOccurrence: number
) {
  try {
    const startOfMonthDate = startOfMonth(firstOccurrenceDate);

    const firstXDayOfMonth = setDay(
      startOfMonthDate,
      getDay(firstOccurrenceDate),
      {
        weekStartsOn: getDay(startOfMonthDate),
      }
    );
    const nthXDayOfMonth = addWeeks(firstXDayOfMonth, dayOccurrence - 1);
    return getDate(nthXDayOfMonth);
  } catch (err) {
    return -1;
  }
}
