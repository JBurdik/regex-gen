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

const QUANTIFIER_OPTIONS: { value: Quantifier; label: string; descKey: keyof TranslationDict }[] =
  [
    { value: "one", label: "One", descKey: "quantOne" },
    { value: "one_or_more", label: "One+", descKey: "quantOnePlus" },
    { value: "zero_or_more", label: "Zero+", descKey: "quantZeroPlus" },
    { value: "optional", label: "Optional", descKey: "quantOptional" },
    { value: "lazy", label: "Lazy", descKey: "quantLazy" },
  ];

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
                    "flex flex-col items-start rounded-sm border px-2 py-1 text-left text-xs transition-colors cursor-pointer hover:bg-muted",
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
          {QUANTIFIER_OPTIONS.map((q) => (
            <button
              key={q.label}
              type="button"
              onClick={() => onUpdateSegment({ quantifier: q.value })}
              className={cn(
                "rounded-sm border px-2 py-0.5 text-xs transition-colors cursor-pointer hover:bg-muted",
                (segment.quantifier ?? "one") === q.value &&
                  "border-ring bg-muted",
              )}
              title={t[q.descKey]}
            >
              {q.label}
            </button>
          ))}
        </div>
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
                "rounded-sm border px-2 py-0.5 text-xs font-mono transition-colors cursor-pointer hover:bg-muted",
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
