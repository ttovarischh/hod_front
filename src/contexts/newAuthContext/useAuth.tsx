import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as sessionsApi from "./sessions";
import * as usersApi from "./users";

export interface User {
  id: string;
  email: string;
  created_at: any;
  updated_at: any;
  jti: any;
  username: string;
}

interface AuthContextType {
  user?: User;
  loading: boolean;
  error?: any;
  login: (email: string, password: string) => void;
  signUp: (
    email: string,
    password: string,
    password_confirmation: string,
    username: string
  ) => void;
  logout: (email: string) => void;
  about?: any;
  loadingInitial: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

  useEffect(() => {
    usersApi
      .getCurrentUser()
      .then((value) => {
        setUser(value);
        console.log("did it");
      })
      .catch((_error) => {})
      .finally(() => {
        setLoadingInitial(false);
      });
  }, []);

  function login(email: string, password: string) {
    setLoading(true);

    sessionsApi
      .login({ email, password })
      .then((user) => {
        setUser(user);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }

  function signUp(
    email: string,
    password: string,
    password_confirmation: string,
    username: string
  ) {
    setLoading(true);

    usersApi
      .signUp({ email, password, password_confirmation, username })
      .then((user) => {})
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }

  function logout(email: string) {
    sessionsApi.logout({ email }).then(() => setUser(undefined));
  }

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      loadingInitial,
      error,
      login,
      signUp,
      logout,
    }),
    [user, loading, error, loadingInitial]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
