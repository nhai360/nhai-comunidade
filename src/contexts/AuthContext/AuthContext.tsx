import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { Session } from "@/client/users";

type AuthProviderProps = {
  children: ReactNode;
};

type LoginParams = {
  session: Session;
  remember?: boolean;
};

type AuthContextParams = {
  session: Session | null;
  isAuthenticated: boolean;
  login: (params: LoginParams) => void;
  logout: () => void;
};

const AuthContext = createContext({} as AuthContextParams);

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null);

  const isAuthenticated = session !== null;

  useEffect(() => {
    if (!session) {
      const sessionFromStorage = localStorage.getItem(
        "@nhai-comunidade:session",
      );

      if (sessionFromStorage) {
        setSession(JSON.parse(sessionFromStorage));
      }
    }
  }, [session]);

  function login({ session, remember }: LoginParams) {
    setSession(session);

    if (remember) {
      localStorage.setItem("@nhai-comunidade:session", JSON.stringify(session));
    }
  }

  function logout() {
    setSession(null);
    localStorage.removeItem("@nhai-comunidade:session");
  }

  return (
    <AuthContext.Provider value={{ session, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("AuthProvider is required to use this hook");
  }

  return context;
}
