import { useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { Task } from "types/task";
import { cleanObject } from "util/index";
import { useHttp } from "./http";
import { useDebounce } from "util/index";

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
