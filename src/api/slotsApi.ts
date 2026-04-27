export interface SlotDetail {
  visa_location: string;
  slots: number;
  createdon: string;
  start_date?: string;
  available_dates?: string[];
  imghash: string;
}

export interface SlotsResponse {
  slotDetails: SlotDetail[];
  userActivity: unknown;
  userDetails: unknown;
}

const BASE_URL = import.meta.env.VITE_API_URL || 'https://app.checkvisaslots.com';
const API_KEY = import.meta.env.VITE_API_KEY || ''; // User should provide this in .env

const DATE_LIST_FIELD_NAMES = [
  'available_dates',
  'availableDates',
  'all_dates',
  'allDates',
  'dates',
  'slot_dates',
  'slotDates',
  'available_slots',
  'availableSlots',
  'slots_by_date',
  'slotsByDate',
] as const;

const DATE_FIELD_NAMES = [
  'date',
  'slot_date',
  'slotDate',
  'available_date',
  'availableDate',
  'start_date',
  'startDate',
  'earliest_date',
  'earliestDate',
] as const;

const COUNT_FIELD_NAMES = [
  'slots',
  'slot_count',
  'slotCount',
  'count',
  'available_slots',
  'availableSlots',
] as const;

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}/;
const ISO_DATE_GLOBAL_PATTERN = /\d{4}-\d{2}-\d{2}/g;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const normalizeSlotsCount = (value: unknown) => {
  const parsedValue = typeof value === 'number' ? value : Number(value);

  return Number.isFinite(parsedValue) ? Math.max(0, Math.trunc(parsedValue)) : 0;
};

const normalizeString = (value: unknown) => (typeof value === 'string' ? value : undefined);

const getFirstString = (record: Record<string, unknown>, fieldNames: readonly string[]) => {
  for (const fieldName of fieldNames) {
    const value = normalizeString(record[fieldName]);

    if (value) {
      return value;
    }
  }

  return undefined;
};

const getFirstPositiveCount = (record: Record<string, unknown>) => {
  for (const fieldName of COUNT_FIELD_NAMES) {
    const parsedValue = normalizeSlotsCount(record[fieldName]);

    if (parsedValue > 0) {
      return parsedValue;
    }
  }

  return 1;
};

const expandDate = (dateString: string, count = 1) =>
  Array.from({ length: Math.max(1, count) }, () => dateString);

const extractDatesFromString = (value: string) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return [];
  }

  if (trimmedValue.startsWith('[') || trimmedValue.startsWith('{')) {
    try {
      return extractAvailableDates(JSON.parse(trimmedValue));
    } catch {
      return [];
    }
  }

  const isoDateMatches = trimmedValue.match(ISO_DATE_GLOBAL_PATTERN);

  if (isoDateMatches) {
    return isoDateMatches;
  }

  return trimmedValue
    .split(/[;\n|]/)
    .map((dateString) => dateString.trim())
    .filter(Boolean);
};

const extractAvailableDates = (value: unknown): string[] => {
  if (typeof value === 'string') {
    return extractDatesFromString(value);
  }

  if (Array.isArray(value)) {
    return value.flatMap(extractAvailableDates);
  }

  if (!isRecord(value)) {
    return [];
  }

  const directDate = getFirstString(value, DATE_FIELD_NAMES);

  if (directDate) {
    return expandDate(directDate, getFirstPositiveCount(value));
  }

  return Object.entries(value).flatMap(([key, nestedValue]) => {
    if (ISO_DATE_PATTERN.test(key)) {
      return expandDate(key, normalizeSlotsCount(nestedValue) || 1);
    }

    return extractAvailableDates(nestedValue);
  });
};

const normalizeAvailableDates = (record: Record<string, unknown>) => {
  for (const fieldName of DATE_LIST_FIELD_NAMES) {
    const dates = extractAvailableDates(record[fieldName]);

    if (dates.length > 0) {
      return dates;
    }
  }

  return undefined;
};

const normalizeSlotDetail = (value: unknown): SlotDetail => {
  if (!isRecord(value)) {
    return {
      visa_location: 'Unknown location',
      slots: 0,
      createdon: new Date().toISOString(),
      imghash: '',
    };
  }

  const availableDates = normalizeAvailableDates(value);
  const startDate = getFirstString(value, DATE_FIELD_NAMES) ?? availableDates?.[0];

  return {
    visa_location: normalizeString(value.visa_location) ?? 'Unknown location',
    slots: normalizeSlotsCount(value.slots),
    createdon: normalizeString(value.createdon) ?? new Date().toISOString(),
    start_date: startDate,
    available_dates: availableDates,
    imghash: normalizeString(value.imghash) ?? '',
  };
};

/**
 * Fetches real-time slot data from the production API.
 */
export const fetchSlots = async (): Promise<SlotsResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/slots/v3`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'x-api-key': API_KEY,
        'x-mobile-os': 'web-premium', // Custom header to identify our premium web client
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data: unknown = await response.json();
    
    // Validate the response has the expected structure
    if (!isRecord(data) || !Array.isArray(data.slotDetails)) {
      throw new Error('Invalid API response format');
    }

    return {
      slotDetails: data.slotDetails.map(normalizeSlotDetail),
      userActivity: data.userActivity,
      userDetails: data.userDetails,
    };
  } catch (error) {
    console.error('Failed to fetch slots from live API:', error);
    throw error;
  }
};
