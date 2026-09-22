import { computed, type Ref } from 'vue';
import type { SubwayLine } from '~/types/types';

// MTA line colours, used when a subway_lines entry doesn't carry its own.
const MTA_COLORS: Record<string, string> = {
  '1': '#ee352e', '2': '#ee352e', '3': '#ee352e',
  '4': '#00933c', '5': '#00933c', '6': '#00933c',
  '7': '#b933ad',
  A: '#0039a6', C: '#0039a6', E: '#0039a6',
  B: '#ff6319', D: '#ff6319', F: '#ff6319', M: '#ff6319',
  G: '#6cbe45',
  J: '#996633', Z: '#996633',
  L: '#a7a9ac',
  N: '#fccc0a', Q: '#fccc0a', R: '#fccc0a', W: '#fccc0a',
  S: '#808183',
};

// Shown until a clinic has real subway_lines data (user asked for the mockup's
// sample set as a placeholder).
export const PLACEHOLDER_SUBWAY_LINES: SubwayLine[] = [
  { line: '1' }, { line: '2' }, { line: '3' },
  { line: '4' }, { line: '5' },
  { line: 'R' }, { line: 'W' },
];

export const subwayLineColor = (l: SubwayLine): string =>
  l.color || MTA_COLORS[l.line?.toUpperCase()] || '#03292e';

// Normalises whatever the payload carries (array of strings or {line,color}
// objects, or null) into SubwayLine[]; falls back to the placeholder set.
export const useSubwayLines = (
  source: Ref<unknown> | (() => unknown),
) =>
  computed<SubwayLine[]>(() => {
    const raw = typeof source === 'function' ? source() : source.value;
    if (!Array.isArray(raw) || raw.length === 0) return PLACEHOLDER_SUBWAY_LINES;
    return raw
      .map((entry) =>
        typeof entry === 'string' ? { line: entry } : (entry as SubwayLine),
      )
      .filter((entry) => entry && entry.line);
  });
