import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { Project } from "types/project";
import { cleanObject } from "util/index";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";

export const useKanbans = (params?: Partial<Kanban>) => {
  const httpClient = useHttp();
  // params 变化会重新请求
  return useQuery<Kanban[], Error>(["kanbans", cleanObject(params || {})], () =>
    httpClient("kanbans", { data: params })
  );
};

export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Kanban>) =>
      client(`kanbans`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) => client(`kanbans/${id}`, { method: "DELETE" }),
    useDeleteConfig(queryKey)
  );
};
