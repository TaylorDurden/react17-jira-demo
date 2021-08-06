import { useMemo } from "react";
import { useLocation } from "react-router";
import { useDebounce } from "util/index";
import { useProject } from "util/projects";
import { useUrlQueryParam } from "util/url";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  /// www.a.com/projects/123  => ['projects', '123']
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectById = () => useProject(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });
export const useKanbanQueryKey = () => ["kanbans", useKanbanSearchParams()];

export const useTaskSearchParams = () => {
  const [param, setParam] = useUrlQueryParam([
    "name",
    "typeId",
    "processorId",
    "tagId",
  ]);
  const projectId = useProjectIdInUrl();
  const debouncedName = useDebounce(param.name, 200);
  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: debouncedName,
    }),
    [projectId, param, debouncedName]
  );
};
export const useTasksQueryKey = () => ["tasks", useTaskSearchParams()];
