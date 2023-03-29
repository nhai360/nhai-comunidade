import { Post, usePosts } from "@/client/posts";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type FeedProviderProps = {
  children: ReactNode;
};

type FeedContextParams = {
  posts: Post[];
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  handleSearch: () => void;
};

const FeedContext = createContext({} as FeedContextParams);

export function FeedProvider({ children }: FeedProviderProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const { posts = [], refetch } = usePosts({
    search: searchTerm,
  });

  function handleSearch() {
    refetch();
  }

  return (
    <FeedContext.Provider
      value={{ posts, searchTerm, setSearchTerm, handleSearch }}
    >
      {children}
    </FeedContext.Provider>
  );
}

export function useFeedContext() {
  const context = useContext(FeedContext);

  if (!context) {
    throw new Error("FeedProvider is required to use this hook");
  }

  return context;
}
