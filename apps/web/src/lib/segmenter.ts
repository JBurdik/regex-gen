import type { Segment } from "./types";

let nextId = 0;

function generateId(): string {
  return `seg_${++nextId}_${Date.now().toString(36)}`;
}

export function segmentText(text: string): Segment[] {
  if (!text) return [];

  const segments: Segment[] = [];
  // Unicode-aware segmentation: letters, digits, whitespace, or single other chars
  const regex = /(\p{L}+)|(\d+)|(\s+)|(.)/gsu;
  let match: RegExpExecArray | null;
  let colorIndex = 0;

  match = regex.exec(text);
  while (match !== null) {
    segments.push({
      id: generateId(),
      text: match[0],
      patternType: "exact",
      colorIndex: colorIndex % 10,
    });
    colorIndex++;
    match = regex.exec(text);
  }

  return segments;
}

export function mergeSegments(
  segments: Segment[],
  indexA: number,
  indexB: number,
): Segment[] {
  if (indexA < 0 || indexB >= segments.length || indexA >= indexB) {
    return segments;
  }
  const merged = [...segments];
  const a = merged[indexA];
  const b = merged[indexB];
  const newSeg: Segment = {
    id: generateId(),
    text: a.text + b.text,
    patternType: "exact",
    colorIndex: a.colorIndex,
  };
  merged.splice(indexA, 2, newSeg);
  return merged;
}

export function splitSegment(
  segments: Segment[],
  index: number,
  splitPos: number,
): Segment[] {
  if (index < 0 || index >= segments.length) return segments;
  const seg = segments[index];
  if (splitPos <= 0 || splitPos >= seg.text.length) return segments;

  const result = [...segments];
  const left: Segment = {
    id: generateId(),
    text: seg.text.slice(0, splitPos),
    patternType: "exact",
    colorIndex: seg.colorIndex,
  };
  const right: Segment = {
    id: generateId(),
    text: seg.text.slice(splitPos),
    patternType: "exact",
    colorIndex: (seg.colorIndex + 1) % 10,
  };
  result.splice(index, 1, left, right);
  return result;
}
