import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { TranslationDict } from "@/i18n/translations/en";
import { useT } from "@/i18n";

type CheatEntry = {
  pattern: string;
  descKey: keyof TranslationDict;
};

type CheatCategory = {
  titleKey: keyof TranslationDict;
  entries: CheatEntry[];
};

const CHEAT_DATA: CheatCategory[] = [
  {
    titleKey: "cheatCharClassTitle",
    entries: [
      { pattern: ".", descKey: "cheatDot" },
      { pattern: "\\d", descKey: "cheatDigit" },
      { pattern: "\\D", descKey: "cheatNotDigit" },
      { pattern: "\\w", descKey: "cheatWord" },
      { pattern: "\\W", descKey: "cheatNotWord" },
      { pattern: "\\s", descKey: "cheatWhitespace" },
      { pattern: "\\S", descKey: "cheatNotWhitespace" },
      { pattern: "[abc]", descKey: "cheatCharSet" },
      { pattern: "[^abc]", descKey: "cheatNegCharSet" },
      { pattern: "[a-z]", descKey: "cheatRange" },
    ],
  },
  {
    titleKey: "cheatQuantifiersTitle",
    entries: [
      { pattern: "*", descKey: "cheatZeroOrMore" },
      { pattern: "+", descKey: "cheatOneOrMore" },
      { pattern: "?", descKey: "cheatOptional" },
      { pattern: "{n}", descKey: "cheatExactly" },
      { pattern: "{n,}", descKey: "cheatNOrMore" },
      { pattern: "{n,m}", descKey: "cheatBetween" },
      { pattern: "*?", descKey: "cheatLazyZero" },
      { pattern: "+?", descKey: "cheatLazyOne" },
    ],
  },
  {
    titleKey: "cheatAnchorsTitle",
    entries: [
      { pattern: "^", descKey: "cheatStart" },
      { pattern: "$", descKey: "cheatEnd" },
      { pattern: "\\b", descKey: "cheatWordBoundary" },
      { pattern: "\\B", descKey: "cheatNotWordBoundary" },
    ],
  },
  {
    titleKey: "cheatGroupsTitle",
    entries: [
      { pattern: "(abc)", descKey: "cheatCaptureGroup" },
      { pattern: "(?<name>abc)", descKey: "cheatNamedGroup" },
      { pattern: "(?:abc)", descKey: "cheatNonCapturing" },
      { pattern: "(?=abc)", descKey: "cheatPosLookahead" },
      { pattern: "(?!abc)", descKey: "cheatNegLookahead" },
      { pattern: "(?<=abc)", descKey: "cheatPosLookbehind" },
      { pattern: "(?<!abc)", descKey: "cheatNegLookbehind" },
      { pattern: "a|b", descKey: "cheatAlternation" },
    ],
  },
  {
    titleKey: "cheatFlagsTitle",
    entries: [
      { pattern: "g", descKey: "cheatFlagG" },
      { pattern: "i", descKey: "cheatFlagI" },
      { pattern: "m", descKey: "cheatFlagM" },
      { pattern: "s", descKey: "cheatFlagS" },
      { pattern: "u", descKey: "cheatFlagU" },
    ],
  },
];

export function CheatSheet() {
  const { t } = useT();

  return (
    <Collapsible>
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted transition-colors cursor-pointer">
        {t.cheatSheetTitle}
        <ChevronDown className="size-4 transition-transform [[data-open]>&]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CHEAT_DATA.map((category) => (
            <div key={category.titleKey} className="rounded-md border p-3">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t[category.titleKey]}
              </h3>
              <div className="space-y-1">
                {category.entries.map((entry) => (
                  <div key={entry.pattern} className="flex items-baseline gap-2 text-xs">
                    <code className="shrink-0 rounded bg-muted px-1.5 py-0.5 font-mono text-[11px]">
                      {entry.pattern}
                    </code>
                    <span className="text-muted-foreground">
                      {t[entry.descKey]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
