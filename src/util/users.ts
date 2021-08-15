import { User } from "types/user";
import { useEffect } from "react";
import { cleanObject } from "util/index";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { useQuery } from "react-query";

export const useUsers = (params?: Partial<User>) => {
  const httpClient = useHttp();
  return useQuery<User[]>([`users`, params], () =>
    httpClient(`users`, { data: params })
  );
};
