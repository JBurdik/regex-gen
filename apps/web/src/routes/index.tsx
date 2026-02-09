import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";
import { ExampleInput } from "@/components/example-input";
import { SegmentDisplay } from "@/components/segment-display";
import { PatternSelector } from "@/components/pattern-selector";
import { RegexOutput } from "@/components/regex-output";
import { LiveTester } from "@/components/live-tester";
import { CheatSheet } from "@/components/cheat-sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { segmentText, mergeSegments } from "@/lib/segmenter";
import { buildRegex } from "@/lib/regex-builder";
import type { Language, Segment } from "@/lib/types";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [exampleText, setExampleText] = useState("");
  const [segments, setSegments] = useState<Segment[]>([]);
  const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>(
    null,
  );
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("javascript");
  const [testText, setTestText] = useState("");

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

        <LiveTester
          pattern={pattern}
          testText={testText}
          onTestTextChange={setTestText}
        />

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
