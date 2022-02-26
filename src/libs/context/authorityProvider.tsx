import React, { ReactNode, useEffect, useState } from "react";
import { User } from "libs/types/user";
import { loginForm } from "libs/types/login";
import { getUserInfo, login } from "libs/api/user-api";
import util from "libs/utils/util";
import { submitType } from "libs/types/formField";
import { useMountedRef } from "libs/hooks";
import omit from "lodash/omit";
import defaults from "lodash/defaults";

const AuthorityContext = React.createContext<{
  user: User | null;
  loginImplement: (...args: submitType<loginForm>) => void;
  loginOutImplement: () => void;
} | null>(null);

AuthorityContext.displayName = "AuthorityContext";

const AuthorityProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const mountedRef = useMountedRef();

  useEffect(() => {
    const value = util.getStorage("__authInfo__");
    if (!user && value && mountedRef.current) {
      setUser(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setDataMethod = (res: User): void => {
    if (mountedRef.current) {
      const data = omit(res, "token");
      util.setStorage("__authInfo__", data);
      setUser(res);
    }
  };

  const loginImplement = async (...args: submitType<loginForm>) => {
    const [value, suc, error] = args;
    try {
      const data = await login<loginForm>(value);
      util.setStorage("accessToken", data.token);
      const userInfo = await getUserInfo();
      suc();
      setDataMethod(defaults(userInfo, data));
    } catch (e) {
      error();
    }
  };

  const loginOutImplement = () => {
    if (mountedRef.current) {
      setUser(null);
      util.clearStorage("__authInfo__");
      util.clearStorage("accessToken");
      util.clearStorage("userInfo");
      window.location.reload();
    }
  };

  return (
    <AuthorityContext.Provider
      value={{
        user,
        loginImplement,
        loginOutImplement,
      }}
    >
      {children}
    </AuthorityContext.Provider>
  );
};

export default AuthorityProvider;

export const useAuth = () => {
  const context = React.useContext(AuthorityContext);
  if (!context) {
    throw new Error("useAuth必须在AuthorityProvider中使用");
  }
  return context;
};
