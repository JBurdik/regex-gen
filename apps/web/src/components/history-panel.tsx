import { useQuery } from "@tanstack/react-query";
import { History, RotateCcw, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
    <Sheet>
      <SheetTrigger className="fixed bottom-6 right-6 z-40 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors cursor-pointer">
        <History className="size-5" />
        {entries.length > 0 && (
          <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold">
            {entries.length}
          </span>
        )}
      </SheetTrigger>
      <SheetContent side="right" className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{t.historyTitle}</SheetTitle>
        </SheetHeader>
        <div className="p-4 pt-2">
          {entries.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              {t.historyEmpty}
            </p>
          ) : (
            <div className="space-y-2">
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
        </div>
      </SheetContent>
    </Sheet>
  );
}
