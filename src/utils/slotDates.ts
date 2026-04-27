export interface SlotDateSummary {
  key: string;
  date: Date;
  label: string;
  shortLabel: string;
  slotCount?: number;
}

const DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

const shortDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
});

const padDatePart = (value: number) => String(value).padStart(2, '0');

export const parseSlotDate = (dateString?: string): Date | null => {
  if (!dateString) {
    return null;
  }

  const trimmedDate = dateString.trim();
  const dateOnlyMatch = DATE_ONLY_PATTERN.exec(trimmedDate);

  if (dateOnlyMatch) {
    const [, year, month, day] = dateOnlyMatch;
    const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));

    return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
  }

  const parsedDate = new Date(trimmedDate);

  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
};

export const getSlotDateKey = (date: Date) =>
  `${date.getFullYear()}-${padDatePart(date.getMonth() + 1)}-${padDatePart(date.getDate())}`;

export const getSlotCountLabel = (count: number) =>
  `${count} ${count === 1 ? 'slot' : 'slots'}`;

export const getSlotDateSummaries = (
  earliestDate?: string,
  availableDates: string[] = [],
  totalSlots = 0,
): SlotDateSummary[] => {
  const normalizedTotalSlots = Math.max(0, Math.trunc(Number(totalSlots) || 0));
  const buckets = new Map<
    string,
    {
      date: Date;
      rawCount: number;
      firstIndex: number;
    }
  >();

  const addDate = (dateString: string, firstIndex: number, countIncrement: number) => {
    const parsedDate = parseSlotDate(dateString);

    if (!parsedDate) {
      return;
    }

    const key = getSlotDateKey(parsedDate);
    const existingBucket = buckets.get(key);

    if (existingBucket) {
      existingBucket.rawCount += countIncrement;
      existingBucket.firstIndex = Math.min(existingBucket.firstIndex, firstIndex);
      return;
    }

    buckets.set(key, {
      date: parsedDate,
      rawCount: countIncrement,
      firstIndex,
    });
  };

  const hasAvailableDates = availableDates.length > 0;

  if (hasAvailableDates) {
    availableDates.forEach((dateString, index) => addDate(dateString, index, 1));
  } else if (earliestDate) {
    addDate(earliestDate, -1, 1);
  }

  const rows = Array.from(buckets.entries()).sort(([, left], [, right]) => {
    const dateDifference = left.date.getTime() - right.date.getTime();

    return dateDifference !== 0 ? dateDifference : left.firstIndex - right.firstIndex;
  });

  const canTrustPerDateCounts = hasAvailableDates && normalizedTotalSlots === availableDates.length;

  return rows.map(([key, bucket]) => {
    let slotCount: number | undefined;

    if (canTrustPerDateCounts || bucket.rawCount > 1) {
      slotCount = Math.max(1, bucket.rawCount);
    } else if (!hasAvailableDates && normalizedTotalSlots === 1) {
      slotCount = 1;
    }

    return {
      key,
      date: bucket.date,
      label: dateFormatter.format(bucket.date),
      shortLabel: shortDateFormatter.format(bucket.date),
      slotCount,
    };
  });
};

export const getEarliestSlotDate = (earliestDate?: string, availableDates: string[] = []) =>
  getSlotDateSummaries(earliestDate, availableDates)[0] ?? null;
