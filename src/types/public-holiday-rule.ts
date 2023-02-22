import {Month} from '../enums/month';
import {Day} from '../enums/day';

export type PublicHolidayRule = {
  holidays: HolidayRule[];
  offsetToNextWeekday?: boolean;
};

export type HolidayOnDatesRule = {
  [key in Month]?: number[];
};

export type HolidayOnDaysRule = {
  [key in Month]?: {
    [key in Day]?: number[];
  };
};

export type HolidayRule = HolidayOnDaysRule | HolidayOnDatesRule;
