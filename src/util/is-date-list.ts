/**
 * Type Guard for DateList
 * @param list validates if the given list is of type Date
 * @returns Strongly typed Date[]
 */
export function isDateList(list: unknown): list is Date[] {
  return (list as Date[]).at(0) instanceof Date;
}
