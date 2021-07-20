import React, { ReactNode, useState } from "react";
import * as Auth from "auth-provider";
import { User } from "page/project-list/search-panel";
import { http } from "util/http";
import { useMount } from "util/index";
import { useAsync } from "util/use-async";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import { isError } from "react-query";

interface AuthForm {
  username: string;
  password: string;
}

const bootstrapUser = async () => {
  let user = null;
  const token = Auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null);
  const {
    data: user,
    error,
    loading,
    isError,
    setData: setUser,
    run,
    idle,
  } = useAsync<User | null>();
  // (user => setUser(user) ==> setUser) === 函数式编程中的point free
  const login = (form: AuthForm) => Auth.login(form).then(setUser);
  const register = (form: AuthForm) => Auth.register(form).then(setUser);
  const logout = () => Auth.logout().then(() => setUser(null));

  useMount(() => {
    run(bootstrapUser());
  });

  if (idle || loading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
