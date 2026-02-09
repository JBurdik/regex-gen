import { useMemo } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useT, plural } from "@/i18n";

type LiveTesterProps = {
  pattern: string;
  testText: string;
  onTestTextChange: (value: string) => void;
};

type MatchResult = {
  start: number;
  end: number;
  text: string;
};

function findMatches(pattern: string, text: string): MatchResult[] {
  if (!pattern || !text) return [];
  try {
    const regex = new RegExp(pattern, "g");
    const matches: MatchResult[] = [];
    let m: RegExpExecArray | null;
    let safety = 0;
    m = regex.exec(text);
    while (m !== null && safety < 1000) {
      matches.push({ start: m.index, end: m.index + m[0].length, text: m[0] });
      if (m[0].length === 0) regex.lastIndex++;
      safety++;
      m = regex.exec(text);
    }
    return matches;
  } catch {
    return [];
  }
}

function HighlightedText({
  text,
  matches,
}: { text: string; matches: MatchResult[] }) {
  if (matches.length === 0) {
    return <span>{text}</span>;
  }

  const parts: React.ReactNode[] = [];
  let lastEnd = 0;

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    if (match.start > lastEnd) {
      parts.push(
        <span key={`t-${lastEnd}`}>{text.slice(lastEnd, match.start)}</span>,
      );
    }
    parts.push(
      <mark
        key={`m-${match.start}`}
        className="bg-emerald-400/30 text-emerald-800 dark:text-emerald-200 rounded-sm px-px"
      >
        {match.text}
      </mark>,
    );
    lastEnd = match.end;
  }

  if (lastEnd < text.length) {
    parts.push(<span key={`t-${lastEnd}`}>{text.slice(lastEnd)}</span>);
  }

  return <>{parts}</>;
}

export function LiveTester({
  pattern,
  testText,
  onTestTextChange,
}: LiveTesterProps) {
  const { t } = useT();

  const matches = useMemo(
    () => findMatches(pattern, testText),
    [pattern, testText],
  );

  const isInvalid = useMemo(() => {
    if (!pattern) return false;
    try {
      new RegExp(pattern);
      return false;
    } catch {
      return true;
    }
  }, [pattern]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor="test-input" className="text-sm font-medium">
          {t.liveTesterLabel}
        </label>
        {testText && (
          <span className="text-xs text-muted-foreground">
            {isInvalid ? (
              <span className="text-destructive">{t.liveTesterInvalid}</span>
            ) : (
              plural(matches.length, t.matchSingular, t.matchPlural)
            )}
          </span>
        )}
      </div>
      <Textarea
        id="test-input"
        value={testText}
        onChange={(e) => onTestTextChange(e.target.value)}
        placeholder={t.liveTesterPlaceholder}
        className="font-mono text-sm min-h-[80px]"
        spellCheck={false}
      />
      {testText && !isInvalid && (
        <div className="rounded-md border bg-muted/30 p-3 font-mono text-sm whitespace-pre-wrap break-all min-h-[40px]">
          <HighlightedText text={testText} matches={matches} />
        </div>
      )}
    </div>
  );
}
