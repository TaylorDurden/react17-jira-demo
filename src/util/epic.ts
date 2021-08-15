import { QueryKey, useMutation, useQuery } from "react-query";
import { Epic } from "types/epic";
import { cleanObject } from "util/index";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";

export const useEpics = (params?: Partial<Epic>) => {
  const httpClient = useHttp();
  // params 变化会重新请求
  return useQuery<Epic[], Error>(["epics", cleanObject(params || {})], () =>
    httpClient("epics", { data: params })
  );
};

export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Epic>) =>
      client(`epics`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteEpic = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) => client(`epics/${id}`, { method: "DELETE" }),
    useDeleteConfig(queryKey)
  );
};

export interface SortProps {
  // 要重新排序的 item
  fromId: number;
  // 目标 item
  referenceId: number;
  // 放在目标item的前还是后
  type: "before" | "after";
  fromEpicId?: number;
  toEpicId?: number;
}

// export const useReorderEpic = (queryKey: QueryKey) => {
//   const client = useHttp();
//   return useMutation((params: SortProps) => {
//     return client(`epics/reorder`, {
//       data: params,
//       method: "POST",
//     });
//   }, useReorderEpicConfig(queryKey));
// };
