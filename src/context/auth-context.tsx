import React, { ReactNode, useState } from "react";
import * as Auth from "auth-provider";
import { User } from "page/project/search-panel";

interface AuthForm {
  username: string;
  password: string;
}


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
  const [user, setUser] = useState<User | null>(null);

  // (user => setUser(user) ==> setUser) === 函数式编程中的point free
  const login = (form: AuthForm) => Auth.login(form).then(setUser);
  const register = (form: AuthForm) => Auth.register(form).then(setUser);
  const logout = () => Auth.logout().then(() => setUser(null));

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
