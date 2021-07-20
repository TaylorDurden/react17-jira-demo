import { Project } from "page/project-list";
import { useEffect } from "react";
import { cleanObject } from "util/index";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProjects = (params?: Partial<Project>) => {
  const httpClient = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  useEffect(() => {
    run(httpClient("projects", { data: cleanObject(params || {}) }));
  }, [params]);
  return result;
};
