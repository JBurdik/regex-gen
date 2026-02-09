import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { getHistory, saveHistory, deleteHistory } from "./history.server";
import type { HistoryEntry, Language, Segment } from "./types";

export const historyQueryOptions = queryOptions({
  queryKey: ["history"],
  queryFn: () => getHistory(),
});

export function useSaveHistory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      id: string;
      example: string;
      segments: Segment[];
      pattern: string;
      language: Language;
    }) => saveHistory({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });
}

export function useDeleteHistory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteHistory({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });
}
