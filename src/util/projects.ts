import { Project } from "page/project-list";
import { useProjectSearchParams } from "page/project-list/util";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { cleanObject } from "util/index";
import { useHttp } from "./http";

export const useProjects = (params?: Partial<Project>) => {
  const httpClient = useHttp();
  // params 变化会重新请求
  return useQuery<Project[], Error>(["projects", params], () =>
    httpClient("projects", { data: params })
  );
};

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  const [searchParams] = useProjectSearchParams();
  const queryKey = ["projects", searchParams];
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
      // Optimistic UI Update
      async onMutate(target) {
        const previousItems = queryClient.getQueryData(queryKey);
        // Here setQueryData by queryKey with target(new value), finding old project in query cache projects by id, overwrite new data for that matched project.
        queryClient.setQueryData(
          queryKey,
          (old?: Project[]) =>
            old?.map((project) =>
              project.id === target.id ? { ...project, ...target } : project
            ) || []
        );
        return { previousItems }; //这里给onError做数据回滚
      },
      // Optimistic UI Update Error Rollback Data
      onError(error, newItem, context) {
        queryClient.setQueryData(
          queryKey,
          (context as { previousItems: Project[] }).previousItems
        );
      },
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
