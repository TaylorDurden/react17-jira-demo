import { useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { Project } from "types/project";
import { cleanObject } from "util/index";
import { useHttp } from "./http";

export const useKanbans = (params?: Partial<Kanban>) => {
  const httpClient = useHttp();
  // params 变化会重新请求
  return useQuery<Kanban[], Error>(["kanbans", cleanObject(params || {})], () =>
    httpClient("kanbans", { data: params })
  );
};
