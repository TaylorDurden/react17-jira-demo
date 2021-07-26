import { Project } from "page/project-list";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { cleanObject } from "util/index";
import { useHttp } from "./http";

export const useProjects = (params?: Partial<Project>) => {
  const httpClient = useHttp();
  // params 变化会重新请求
  return useQuery<Project[], Error>(
    ["projects", cleanObject(params || {})],
    () => httpClient("projects", { data: params })
  );
};

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(`projects`),
    }
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: Boolean(id), // id is not undenfined or null will enable this request
    }
  );
};
