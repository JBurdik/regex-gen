import { createFileRoute } from "@tanstack/react-router";
import { Save } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { ExampleInput } from "@/components/example-input";
import { HistoryPanel } from "@/components/history-panel";
import { SegmentDisplay } from "@/components/segment-display";
import { PatternSelector } from "@/components/pattern-selector";
import { RegexOutput } from "@/components/regex-output";
import { LiveTester } from "@/components/live-tester";
import { CheatSheet } from "@/components/cheat-sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { segmentText, mergeSegments } from "@/lib/segmenter";
import { buildRegex } from "@/lib/regex-builder";
import { useSaveHistory } from "@/lib/history-queries";
import { useT } from "@/i18n";
import type { HistoryEntry, Language, Segment } from "@/lib/types";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const { t } = useT();
  const [exampleText, setExampleText] = useState("");
  const [segments, setSegments] = useState<Segment[]>([]);
  const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>(
    null,
  );
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("javascript");
  const [testText, setTestText] = useState("");
  const saveMutation = useSaveHistory();

  const handleExampleChange = useCallback((text: string) => {
    setExampleText(text);
    const newSegments = segmentText(text);
    setSegments(newSegments);
    setSelectedSegmentId(null);
  }, []);

  const handleSelectSegment = useCallback((id: string) => {
    setSelectedSegmentId((prev) => (prev === id ? null : id));
  }, []);

  const handleMerge = useCallback(
    (indexA: number, indexB: number) => {
      setSegments((prev) => mergeSegments(prev, indexA, indexB));
      setSelectedSegmentId(null);
    },
    [],
  );

  const handleUpdateSegment = useCallback(
    (updates: Partial<Segment>) => {
      setSegments((prev) =>
        prev.map((seg) =>
          seg.id === selectedSegmentId ? { ...seg, ...updates } : seg,
        ),
      );
    },
    [selectedSegmentId],
  );

  const pattern = useMemo(() => buildRegex(segments), [segments]);

  const selectedSegment = useMemo(
    () => segments.find((s) => s.id === selectedSegmentId) ?? null,
    [segments, selectedSegmentId],
  );

  const handleSave = useCallback(() => {
    if (!pattern) return;
    saveMutation.mutate(
      {
        id: crypto.randomUUID(),
        example: exampleText,
        segments,
        pattern,
        language: selectedLanguage,
      },
      { onSuccess: () => toast.success(t.historySaved) },
    );
  }, [pattern, exampleText, segments, selectedLanguage, saveMutation, t]);

  const handleRestore = useCallback((entry: HistoryEntry) => {
    setExampleText(entry.example);
    setSegments(entry.segments);
    setSelectedLanguage(entry.language);
    setSelectedSegmentId(null);
  }, []);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6 w-full">
      <div className="space-y-6">
        <ExampleInput value={exampleText} onChange={handleExampleChange} />

        <SegmentDisplayWithPopover
          segments={segments}
          selectedSegmentId={selectedSegmentId}
          selectedSegment={selectedSegment}
          onSelectSegment={handleSelectSegment}
          onMerge={handleMerge}
          onUpdateSegment={handleUpdateSegment}
        />

        <RegexOutput
          pattern={pattern}
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />

        {pattern && (
          <button
            type="button"
            onClick={handleSave}
            disabled={saveMutation.isPending}
            className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted transition-colors cursor-pointer disabled:opacity-50"
          >
            <Save className="size-4" />
            {t.historySave}
          </button>
        )}

        <LiveTester
          pattern={pattern}
          testText={testText}
          onTestTextChange={setTestText}
        />

        <HistoryPanel onRestore={handleRestore} />

        <CheatSheet />
      </div>
    </div>
  );
}

function SegmentDisplayWithPopover({
  segments,
  selectedSegmentId,
  selectedSegment,
  onSelectSegment,
  onMerge,
  onUpdateSegment,
}: {
  segments: Segment[];
  selectedSegmentId: string | null;
  selectedSegment: Segment | null;
  onSelectSegment: (id: string) => void;
  onMerge: (indexA: number, indexB: number) => void;
  onUpdateSegment: (updates: Partial<Segment>) => void;
}) {
  return (
    <Popover open={selectedSegment !== null}>
      <PopoverTrigger
        render={
          <div />
        }
      >
        <SegmentDisplay
          segments={segments}
          selectedId={selectedSegmentId}
          onSelectSegment={onSelectSegment}
          onMerge={onMerge}
        />
      </PopoverTrigger>
      {selectedSegment && (
        <PopoverContent
          side="bottom"
          align="start"
          className="w-80 max-h-[70vh] overflow-y-auto"
        >
          <PatternSelector
            segment={selectedSegment}
            onUpdateSegment={onUpdateSegment}
          />
        </PopoverContent>
      )}
    </Popover>
  );
}
