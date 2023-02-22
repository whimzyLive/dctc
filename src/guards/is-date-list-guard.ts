/**
 * Type Guard for DateList
 * @param list validates if the given list is of type Date
 * @returns Strongly typed Date[]
 */
export function isDateListGuard(list: unknown): list is Date[] {
  return (
    Array.isArray(list as Date[]) &&
    ((list as Date[]).at(0) instanceof Date || !(list as Date[]).length)
  );
}
