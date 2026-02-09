import { cn } from "@/lib/utils";
import { getPatternDef } from "@/lib/patterns";
import type { Segment } from "@/lib/types";
import { useT } from "@/i18n";

const SEGMENT_COLORS = [
  "bg-blue-500/20 border-blue-500/40 text-blue-700 dark:text-blue-300",
  "bg-emerald-500/20 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  "bg-violet-500/20 border-violet-500/40 text-violet-700 dark:text-violet-300",
  "bg-amber-500/20 border-amber-500/40 text-amber-700 dark:text-amber-300",
  "bg-rose-500/20 border-rose-500/40 text-rose-700 dark:text-rose-300",
  "bg-cyan-500/20 border-cyan-500/40 text-cyan-700 dark:text-cyan-300",
  "bg-orange-500/20 border-orange-500/40 text-orange-700 dark:text-orange-300",
  "bg-pink-500/20 border-pink-500/40 text-pink-700 dark:text-pink-300",
  "bg-teal-500/20 border-teal-500/40 text-teal-700 dark:text-teal-300",
  "bg-indigo-500/20 border-indigo-500/40 text-indigo-700 dark:text-indigo-300",
];

type SegmentDisplayProps = {
  segments: Segment[];
  selectedId: string | null;
  onSelectSegment: (id: string) => void;
  onMerge: (indexA: number, indexB: number) => void;
};

export function SegmentDisplay({
  segments,
  selectedId,
  onSelectSegment,
  onMerge,
}: SegmentDisplayProps) {
  const { t } = useT();

  if (segments.length === 0) {
    return (
      <div className="rounded-md border border-dashed p-6 text-center text-muted-foreground text-sm">
        {t.segmentsEmpty}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{t.segmentsLabel}</label>
      <div className="flex flex-wrap items-start gap-1 rounded-md border p-3 min-h-[52px]">
        {segments.map((segment, i) => {
          const patternDef = getPatternDef(segment.patternType);
          const colorClass = SEGMENT_COLORS[segment.colorIndex % SEGMENT_COLORS.length];
          const isSelected = segment.id === selectedId;

          return (
            <div key={segment.id} className="flex items-center gap-0">
              <button
                type="button"
                onClick={() => onSelectSegment(segment.id)}
                className={cn(
                  "inline-flex flex-col items-center rounded-sm border px-2 py-1 font-mono text-sm transition-all cursor-pointer",
                  colorClass,
                  isSelected && "ring-2 ring-ring ring-offset-1 ring-offset-background",
                )}
              >
                <span className="whitespace-pre">{segment.text}</span>
                <span className="text-[10px] opacity-70 font-sans">
                  {patternDef ? t[patternDef.labelKey] : segment.patternType}
                </span>
              </button>
              {i < segments.length - 1 && (
                <button
                  type="button"
                  onClick={() => onMerge(i, i + 1)}
                  className="mx-0.5 h-6 w-3 flex items-center justify-center rounded-sm text-muted-foreground/40 hover:text-muted-foreground hover:bg-muted transition-colors cursor-pointer text-xs"
                  title={t.segmentsMerge}
                >
                  +
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
