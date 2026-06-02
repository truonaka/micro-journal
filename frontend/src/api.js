import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "./lib/apiClient";

const queryKeys = {
    entries: ["entries"],
    stats: ["stats"],
    calendar: ["calendar"],
    entry: date => ["entry", date]
};

async function fetchEntries() {
    const response = await apiClient.get("/entries");
    return response.data;
}

async function fetchEntry(date) {
    const response = await apiClient.get(`/entries/${date}`);
    return response.data;
}

async function saveEntry(data) {
    const response = await apiClient.post("/entries", data);
    return response.data;
}

async function fetchStats() {
    const response = await apiClient.get("/stats");
    return response.data;
}

async function fetchCalendarData() {
    const [entries, stats] = await Promise.all([fetchEntries(), fetchStats()]);
    return { entries: entries || [], stats: stats || {} };
}

export function useEntriesQuery() {
    return useQuery({
        queryKey: queryKeys.entries,
        queryFn: fetchEntries
    });
}

export function useTodayEntryQuery(date) {
    return useQuery({
        queryKey: queryKeys.entry(date),
        queryFn: () => fetchEntry(date),
        enabled: Boolean(date)
    });
}

export function useCalendarDataQuery() {
    return useQuery({
        queryKey: queryKeys.calendar,
        queryFn: fetchCalendarData
    });
}

export function useSaveEntryMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: saveEntry,
        onSuccess: (_savedEntry, variables) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.entries });
            queryClient.invalidateQueries({ queryKey: queryKeys.stats });
            queryClient.invalidateQueries({ queryKey: queryKeys.calendar });

            if (variables?.date) {
                queryClient.invalidateQueries({ queryKey: queryKeys.entry(variables.date) });
            }
        }
    });
}
