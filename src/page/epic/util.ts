import { useProjectIdInUrl } from "page/kanban/util";

export const useEpicSearchParams = () => ({ projectId: useProjectIdInUrl() });
export const useEpicQueryKey = () => ["epics", useEpicSearchParams()];
