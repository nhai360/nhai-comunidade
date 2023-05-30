import { Video, useVideos } from "@/client/videos";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type VideosProviderProps = {
  children: ReactNode;
};

type VideoContextParams = {
  videos: Video[];
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  handleSearch: () => void;
};

const VideoContext = createContext({} as VideoContextParams);

export function VideosProvider({ children }: VideosProviderProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const { videos = [], refetch } = useVideos({
    search: searchTerm,
  });

  function handleSearch() {
    refetch();
  }

  return (
    <VideoContext.Provider
      value={{ videos, searchTerm, setSearchTerm, handleSearch }}
    >
      {children}
    </VideoContext.Provider>
  );
}

export function useVideoContext() {
  const context = useContext(VideoContext);

  if (!context) {
    throw new Error("VideosProvider is required to use this hook");
  }

  return context;
}
