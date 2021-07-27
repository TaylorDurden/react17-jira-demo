import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useProject } from "util/projects";
import { useUrlQueryParam } from "util/url";

export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

export const useProjectsQueryKey = () => {
  const [params] = useProjectSearchParams();
  return ["projects", params];
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);
  const { data: editingProjectDetail, isLoading } = useProject(
    Number(editingProjectId)
  );
  const [_, setUrlParams] = useSearchParams();

  const open = () => setProjectCreate({ projectCreate: true });

  const close = () => setUrlParams({ projectCreate: "", editingProjectId: "" });
  const editProjectById = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
    open,
    close,
    editProjectById,
    editingProjectDetail,
    isLoading,
  };

  // 这里返回tuple类型，但分先后顺序
  // return [
  //   projectCreate === 'true',
  //   open,
  //   close
  // ] as const;
};
