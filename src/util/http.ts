import qs from "qs";
import * as auth from 'auth-provider'
import { useAuth } from "context/auth-context";
const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  data?: object;
  token?: string;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET", // default is GET method, ...customConfig can overwrite the method field
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  // axios would throw error when response status is not 2xx
  return window.fetch(`${apiUrl}/${endpoint}`, config)
  .then(async res => {
    if(res.status === 401){
      await auth.logout();
      window.location.reload()
      return Promise.reject({message:"please login again"});
    }

    const data = await res.json();
    if(res.ok){
      return data;
    }
    else{
      return Promise.reject(data);
    }
  });
};

export const useHttp = () => {
  const {user} = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, {...config, token: user?.token})
}