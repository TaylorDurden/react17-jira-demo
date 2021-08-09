import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { Task } from "types/task";
import { cleanObject } from "util/index";
import { useHttp } from "./http";
import { useDebounce } from "util/index";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";

export const useTasks = (params?: Partial<Task>) => {
  const httpClient = useHttp();
  const debouncedParam = { ...params, name: useDebounce(params?.name, 200) };
  // params 变化会重新请求
  return useQuery<Task[], Error>(["tasks", debouncedParam], () =>
    httpClient("tasks", { data: debouncedParam })
  );
};

export const useTaskTypes = () => {
  const httpClient = useHttp();
  // params 变化会重新请求
  return useQuery<Task[], Error>(["taskTypes"], () => httpClient("taskTypes"));
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useTask = (id: number) => {
  const client = useHttp();

  return useQuery(["task", { id }], () => client(`tasks/${id}`), {
    enabled: Boolean(id),
  });
};

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) => client(`tasks/${id}`, { method: "DELETE" }),
    useDeleteConfig(queryKey)
  );
};
