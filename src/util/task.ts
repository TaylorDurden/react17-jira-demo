import { useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { Task } from "types/task";
import { cleanObject } from "util/index";
import { useHttp } from "./http";

export const useTasks = (params?: Partial<Task>) => {
  const httpClient = useHttp();
  // params 变化会重新请求
  return useQuery<Task[], Error>(["tasks", cleanObject(params || {})], () =>
    httpClient("tasks", { data: params })
  );
};

export const useTaskTypes = () => {
  const httpClient = useHttp();
  // params 变化会重新请求
  return useQuery<Task[], Error>(["taskTypes"], () => httpClient("taskTypes"));
};
