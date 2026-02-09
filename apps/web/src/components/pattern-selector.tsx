import { CATEGORIES, PATTERN_DEFS } from "@/lib/patterns";
import type { TranslationDict } from "@/i18n/translations/en";
import type { GroupType, PatternType, Quantifier, Segment } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n";

type PatternSelectorProps = {
  segment: Segment;
  onUpdateSegment: (updates: Partial<Segment>) => void;
};

type QuantifierPreset = "one" | "one_or_more" | "zero_or_more" | "optional" | "lazy" | "exact" | "range";

const QUANTIFIER_OPTIONS: { value: QuantifierPreset; label: string; descKey: keyof TranslationDict }[] =
  [
    { value: "one", label: "One", descKey: "quantOne" },
    { value: "one_or_more", label: "One+", descKey: "quantOnePlus" },
    { value: "zero_or_more", label: "Zero+", descKey: "quantZeroPlus" },
    { value: "optional", label: "Optional", descKey: "quantOptional" },
    { value: "lazy", label: "Lazy", descKey: "quantLazy" },
    { value: "exact", label: "{n}", descKey: "quantExact" },
    { value: "range", label: "{n,m}", descKey: "quantRange" },
  ];

function getActiveQuantifierPreset(q?: Quantifier): QuantifierPreset {
  if (!q || q === "one") return "one";
  if (q === "one_or_more") return "one_or_more";
  if (q === "zero_or_more") return "zero_or_more";
  if (q === "optional") return "optional";
  if (q === "lazy") return "lazy";
  if (typeof q === "object" && "exactly" in q) return "exact";
  if (typeof q === "object" && "min" in q) return "range";
  return "one";
}

const GROUP_OPTIONS: { value: GroupType | "none"; label: string; descKey: keyof TranslationDict }[] = [
  { value: "none", label: "None", descKey: "groupNone" },
  { value: "capture", label: "()", descKey: "groupCapture" },
  { value: "named", label: "(?<>)", descKey: "groupNamed" },
  { value: "non_capturing", label: "(?:)", descKey: "groupNonCapturing" },
  { value: "lookahead", label: "(?=)", descKey: "groupLookahead" },
  { value: "neg_lookahead", label: "(?!)", descKey: "groupNegLookahead" },
  { value: "lookbehind", label: "(?<=)", descKey: "groupLookbehind" },
  { value: "neg_lookbehind", label: "(?<!)", descKey: "groupNegLookbehind" },
];

export function PatternSelector({
  segment,
  onUpdateSegment,
}: PatternSelectorProps) {
  const { t } = useT();

  return (
    <div className="space-y-3">
      <div>
        <div className="mb-1.5 text-xs font-medium text-muted-foreground">
          {t.patternFor} <span className="font-mono text-foreground">{segment.text}</span>
        </div>
      </div>

      {CATEGORIES.map((cat) => {
        const patterns = PATTERN_DEFS.filter((p) => p.category === cat.key);
        return (
          <div key={cat.key}>
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {t[cat.labelKey]}
            </div>
            <div className="grid grid-cols-2 gap-1">
              {patterns.map((p) => (
                <button
                  key={p.type}
                  type="button"
                  onClick={() =>
                    onUpdateSegment({ patternType: p.type as PatternType })
                  }
                  className={cn(
                    "flex flex-col items-start rounded-md border px-2 py-1 text-left text-xs transition-colors cursor-pointer hover:bg-muted",
                    segment.patternType === p.type &&
                      "border-ring bg-muted",
                  )}
                >
                  <span className="font-medium">{t[p.labelKey]}</span>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {p.preview}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );
      })}

      {segment.patternType === "custom_class" && (
        <div>
          <label className="text-xs font-medium" htmlFor="custom-class-input">{t.characterClassLabel}</label>
          <Input
            id="custom-class-input"
            value={segment.customClass ?? ""}
            onChange={(e) =>
              onUpdateSegment({ customClass: e.target.value })
            }
            placeholder={t.customClassPlaceholder}
            className="mt-1 font-mono text-xs h-7"
          />
        </div>
      )}

      <Separator />

      <div>
        <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {t.quantifierLabel}
        </div>
        <div className="flex flex-wrap gap-1">
          {QUANTIFIER_OPTIONS.map((q) => {
            const activePreset = getActiveQuantifierPreset(segment.quantifier);
            return (
              <button
                key={q.value}
                type="button"
                onClick={() => {
                  if (q.value === "exact") {
                    const current = typeof segment.quantifier === "object" && "exactly" in segment.quantifier ? segment.quantifier.exactly : 1;
                    onUpdateSegment({ quantifier: { exactly: current } });
                  } else if (q.value === "range") {
                    const current = typeof segment.quantifier === "object" && "min" in segment.quantifier ? segment.quantifier : { min: 1, max: 3 };
                    onUpdateSegment({ quantifier: current });
                  } else {
                    onUpdateSegment({ quantifier: q.value });
                  }
                }}
                className={cn(
                  "rounded-md border px-2 py-0.5 text-xs transition-colors cursor-pointer hover:bg-muted",
                  activePreset === q.value && "border-ring bg-muted",
                )}
                title={t[q.descKey]}
              >
                {q.label}
              </button>
            );
          })}
        </div>
        {typeof segment.quantifier === "object" && "exactly" in segment.quantifier && (
          <div className="mt-1.5 flex items-center gap-1.5">
            <Input
              type="number"
              min={1}
              value={segment.quantifier.exactly}
              onChange={(e) => {
                const v = parseInt(e.target.value, 10);
                if (v > 0) onUpdateSegment({ quantifier: { exactly: v } });
              }}
              placeholder={t.quantExactPlaceholder}
              className="font-mono text-xs h-7 w-16"
            />
            <span className="text-xs text-muted-foreground">{t.quantExact}</span>
          </div>
        )}
        {typeof segment.quantifier === "object" && "min" in segment.quantifier && "max" in segment.quantifier && (
          <div className="mt-1.5 flex items-center gap-1.5">
            <Input
              type="number"
              min={0}
              value={segment.quantifier.min}
              onChange={(e) => {
                const v = parseInt(e.target.value, 10);
                if (v >= 0 && typeof segment.quantifier === "object" && "max" in segment.quantifier) {
                  onUpdateSegment({ quantifier: { min: v, max: segment.quantifier.max } });
                }
              }}
              placeholder={t.quantMinPlaceholder}
              className="font-mono text-xs h-7 w-16"
            />
            <span className="text-xs text-muted-foreground">-</span>
            <Input
              type="number"
              min={0}
              value={segment.quantifier.max}
              onChange={(e) => {
                const v = parseInt(e.target.value, 10);
                if (v >= 0 && typeof segment.quantifier === "object" && "min" in segment.quantifier) {
                  onUpdateSegment({ quantifier: { min: segment.quantifier.min, max: v } });
                }
              }}
              placeholder={t.quantMaxPlaceholder}
              className="font-mono text-xs h-7 w-16"
            />
            <span className="text-xs text-muted-foreground">{t.quantRange}</span>
          </div>
        )}
      </div>

      <Separator />

      <div>
        <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {t.groupLabel}
        </div>
        <div className="flex flex-wrap gap-1">
          {GROUP_OPTIONS.map((g) => (
            <button
              key={g.value}
              type="button"
              onClick={() =>
                onUpdateSegment({
                  groupType: g.value === "none" ? undefined : g.value,
                })
              }
              className={cn(
                "rounded-md border px-2 py-0.5 text-xs font-mono transition-colors cursor-pointer hover:bg-muted",
                (segment.groupType ?? "none") === g.value &&
                  "border-ring bg-muted",
              )}
              title={t[g.descKey]}
            >
              {g.label}
            </button>
          ))}
        </div>
        {segment.groupType === "named" && (
          <Input
            value={segment.groupName ?? ""}
            onChange={(e) => onUpdateSegment({ groupName: e.target.value })}
            placeholder={t.groupNamePlaceholder}
            className="mt-1.5 font-mono text-xs h-7"
          />
        )}
      </div>
    </div>
  );
}
