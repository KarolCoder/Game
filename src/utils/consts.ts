import {ConsumablesUnit} from '@/api/types';

export const consumablesUnitsComparision: Record<
  ConsumablesUnit,
  ConsumablesUnit[] | undefined
> = {
  years: undefined,
  year: ['years'],
  months: ['years', 'year'],
  month: ['year', 'years', 'months'],
  weeks: ['weeks', 'year', 'years', 'months', 'month'],
  week: ['weeks', 'year', 'years', 'months', 'month', 'weeks'],
  days: ['weeks', 'year', 'years', 'months', 'month', 'weeks', 'week'],
  day: ['weeks', 'year', 'years', 'months', 'month', 'weeks', 'week', 'days'],
};
