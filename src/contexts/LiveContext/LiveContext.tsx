import { Live } from "@/client/lives";
import { useLives } from "@/client/lives/useLives";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type LivesProviderProps = {
  children: ReactNode;
  userId: string;
};

type LiveContextParams = {
  lives: Live[];
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  handleSearch: () => void;
};

const LiveContext = createContext({} as LiveContextParams);

export function LivesProvider({ children, userId = "" }: LivesProviderProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const { lives = [], refetch } = useLives({
    userId,
  });

  function handleSearch() {
    refetch();
  }

  return (
    <LiveContext.Provider
      value={{ lives, searchTerm, setSearchTerm, handleSearch }}
    >
      {children}
    </LiveContext.Provider>
  );
}

export function useLiveContext() {
  const context = useContext(LiveContext);

  if (!context) {
    throw new Error("LivesProvider is required to use this hook");
  }

  return context;
}
