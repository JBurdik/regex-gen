import { useQuery } from "@tanstack/react-query";
import { ChevronDown, RotateCcw, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useT } from "@/i18n";
import { historyQueryOptions, useDeleteHistory } from "@/lib/history-queries";
import type { HistoryEntry } from "@/lib/types";

export function HistoryPanel({
  onRestore,
}: {
  onRestore: (entry: HistoryEntry) => void;
}) {
  const { t } = useT();
  const { data: entries = [] } = useQuery(historyQueryOptions);
  const deleteMutation = useDeleteHistory();

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => toast.success(t.historyDeleted),
    });
  };

  return (
    <Collapsible>
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted transition-colors cursor-pointer">
        {t.historyTitle}
        <ChevronDown className="size-4 transition-transform [[data-open]>&]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        {entries.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground px-1">
            {t.historyEmpty}
          </p>
        ) : (
          <div className="mt-2 space-y-2">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center gap-2 rounded-md border px-3 py-2"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm">{entry.example}</p>
                  <p className="truncate text-xs text-muted-foreground font-mono">
                    {entry.pattern}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onRestore(entry)}
                  className="shrink-0 rounded p-1 hover:bg-muted transition-colors cursor-pointer"
                  title={t.historyRestore}
                >
                  <RotateCcw className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(entry.id)}
                  className="shrink-0 rounded p-1 hover:bg-muted transition-colors text-destructive cursor-pointer"
                  title={t.historyDelete}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
