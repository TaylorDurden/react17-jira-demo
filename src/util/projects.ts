import { Project } from "page/project-list";
import { useEffect } from "react";
import { cleanObject } from "util/index";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProjects = (params?: Partial<Project>) => {
  const httpClient = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  const fetchProjects = () =>
    httpClient("projects", { data: cleanObject(params || {}) });

  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects,
    });
  }, [params]);
  return result;
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
