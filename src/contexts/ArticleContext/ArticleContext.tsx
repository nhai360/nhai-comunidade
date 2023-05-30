import { Article, useArticles } from "@/client/articles";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type ArticlesProviderProps = {
  children: ReactNode;
};

type ArticleContextParams = {
  articles: Article[];
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  handleSearch: () => void;
};

const ArticleContext = createContext({} as ArticleContextParams);

export function ArticlesProvider({ children }: ArticlesProviderProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const { articles = [], refetch } = useArticles({
    search: searchTerm,
  });

  function handleSearch() {
    refetch();
  }

  return (
    <ArticleContext.Provider
      value={{ articles, searchTerm, setSearchTerm, handleSearch }}
    >
      {children}
    </ArticleContext.Provider>
  );
}

export function useArticleContext() {
  const context = useContext(ArticleContext);

  if (!context) {
    throw new Error("ArticlesProvider is required to use this hook");
  }

  return context;
}
