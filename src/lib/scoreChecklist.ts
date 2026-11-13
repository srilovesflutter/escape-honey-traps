import type { BandId, CheckItem } from '@/content/types';

export type ScoreResult = {
  points: number;
  selected: CheckItem[];
  serious: CheckItem[];
  band: BandId;
};

export function scoreChecklist(items: readonly CheckItem[], selectedIds: readonly string[]): ScoreResult {
  const selected = items.filter((item) => selectedIds.includes(item.id));
  const points = selected.reduce((sum, item) => sum + item.weight, 0);
  const serious = selected.filter((item) => item.weight >= 3);
  let band: BandId = 'none';
  if (selected.length === 0) {
    band = 'none';
  } else if (serious.length > 0 || points >= 7) {
    band = 'leave';
  } else if (points >= 3 || selected.some((item) => item.weight >= 2)) {
    band = 'pause';
  } else {
    band = 'watch';
  }
  return { points, selected, serious, band };
}
