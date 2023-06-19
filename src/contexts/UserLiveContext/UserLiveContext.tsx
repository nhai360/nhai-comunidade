import { Live } from "@/client/lives";
import { useUserLives } from "@/client/lives/useUserLives";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type UserLivesProviderProps = {
  children: ReactNode;
  userId: string;
};

type UserLiveContextParams = {
  userlives: Live[];
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  handleSearch: () => void;
};

const UserLiveContext = createContext({} as UserLiveContextParams);

export function UserLivesProvider({
  children,
  userId = "",
}: UserLivesProviderProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const { userlives = [], refetch } = useUserLives({
    userId,
  });

  function handleSearch() {
    refetch();
  }

  return (
    <UserLiveContext.Provider
      value={{ userlives, searchTerm, setSearchTerm, handleSearch }}
    >
      {children}
    </UserLiveContext.Provider>
  );
}

export function useUserLiveContext() {
  const context = useContext(UserLiveContext);

  if (!context) {
    throw new Error("UserLivesProvider is required to use this hook");
  }

  return context;
}
