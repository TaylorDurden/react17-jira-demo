import React, { ReactNode, useCallback } from "react";
import * as Auth from "auth-provider";
import { User } from "page/project-list/search-panel";
import { http } from "util/http";
import { useMount } from "util/index";
import { useAsync } from "util/use-async";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import { useDispatch, useSelector } from "react-redux";
import { bootstrap, selectUser } from "store/auth.slice";
import * as authStore from "store/auth.slice";
export interface AuthForm {
  username: string;
  password: string;
}

export const bootstrapUser = async () => {
  let user = null;
  const token = Auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null);
  const {
    data: user,
    error,
    loading,
    isError,
    idle,
    run,
  } = useAsync<User | null>();
  // (user => setUser(user) ==> setUser) === 函数式编程中的point free

  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();

  useMount(() => {
    run(dispatch(bootstrap()));
  });

  if (idle || loading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  return <div>{children}</div>;
};

export const useAuth = () => {
  // const context = React.useContext(AuthContext);
  // if (!context) {
  //   throw new Error("useAuth必须在AuthProvider中使用");
  // }
  // return context;
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  const user = useSelector(selectUser);
  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
  // login({username: '123', password: '123'}).then(user => console.log(user))
  return {
    user,
    login,
    register,
    logout,
  };
};
