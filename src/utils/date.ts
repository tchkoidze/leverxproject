// import type { DateOfBirth } from "../types";
export interface DateOfBirth {
  year: number | null;
  month: number | null;
  day: number | null;
}

export function toDateInputValue(dob?: {
  year: number | null;
  month: number | null;
  day: number | null;
}) {
  if (!dob || dob.year === null || dob.month === null || dob.day === null)
    return "";

  const yyyy = dob.year.toString().padStart(4, "0");
  const mm = dob.month.toString().padStart(2, "0");
  const dd = dob.day.toString().padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}

export function fromDateInputValue(dateStr: string): DateOfBirth {
  if (!dateStr) return { year: null, month: null, day: null };

  const [yearStr, monthStr, dayStr] = dateStr.split("-");

  const year = yearStr ? Number(yearStr) : null;
  const month = monthStr ? Number(monthStr) : null;
  const day = dayStr ? Number(dayStr) : null;

  return {
    year: isNaN(year!) ? null : year,
    month: isNaN(month!) ? null : month,
    day: isNaN(day!) ? null : day,
  };
}
