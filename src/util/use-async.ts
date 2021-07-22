import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from "util/index";

interface State<D> {
  error: Error | null;
  data: D | null;
  status: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  status: "idle",
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};
// func(1,2,3) => func(...args)
const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [mountedRef, dispatch]
  );
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig }; // initialConfig覆盖defaultConfig的值
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initialState,
    }
  );
  const safeDispatch = useSafeDispatch(dispatch);

  const [retry, setRetry] = useState(() => () => {});

  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        status: "success",
        error: null,
      }),
    [safeDispatch]
  );

  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        status: "error",
        data: null,
      }),
    [safeDispatch]
  );

  // run 用来触发异步请求
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入 Promise 类型数据");
      }

      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig.retry(), runConfig);
        }
      });

      safeDispatch({
        status: "loading",
      });

      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          // catch 会吞异常，如果不主动抛出，外面是接收不到异常的
          setError(error);
          if (config.throwOnError) {
            return Promise.reject(error);
          }
          return error;
        });
    },
    [config.throwOnError, setData, setError, safeDispatch]
  );

  return {
    idle: state.status === "idle",
    loading: state.status === "loading",
    isError: state.status === "error",
    success: state.status === "success",
    run,
    setData,
    setError,
    retry,
    ...state,
  };
};
