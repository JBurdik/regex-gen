import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { getHistory, saveHistory, deleteHistory } from "./history.server";
import { getVisitorId } from "./visitor";
import type { Language, Segment } from "./types";

export const historyQueryOptions = queryOptions({
  queryKey: ["history"],
  queryFn: () => getHistory({ data: { visitorId: getVisitorId() } }),
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
    }) => saveHistory({ data: { ...data, visitorId: getVisitorId() } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });
}

export function useDeleteHistory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      deleteHistory({ data: { id, visitorId: getVisitorId() } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });
}
