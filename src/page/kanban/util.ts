import { useLocation } from "react-router";
import { useProject } from "util/projects";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  /// www.a.com/projects/123  => ['projects', '123']
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectById = () => useProject(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });
export const useKanbanQueryKey = () => ["kanbans", useKanbanSearchParams()];

export const useTaskSearchParams = () => ({ projectId: useProjectIdInUrl() });
export const useTasksQueryKey = () => ["tasks", useTaskSearchParams()];
