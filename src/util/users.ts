import { User } from "page/project-list/search-panel";
import { useEffect } from "react";
import { cleanObject } from "util/index";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useUsers = (params?: Partial<User>) => {
  const httpClient = useHttp();
  const { run, ...result } = useAsync<User[]>();
  useEffect(() => {
    run(httpClient("users", cleanObject(params || {})));
  }, [params]);

  return result;
};
