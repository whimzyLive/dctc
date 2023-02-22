import {HolidayOnDatesRule, HolidayRule} from './../types/public-holiday-rule';

export function isHolidayOnDatesRuleGuard(
  rule: HolidayRule
): rule is HolidayOnDatesRule {
  return (
    !!Object.keys.length &&
    Object.values(rule as HolidayOnDatesRule).every(val => Array.isArray(val))
  );
}
