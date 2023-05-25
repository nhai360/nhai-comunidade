import {
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import { VideoComment } from "@/client/videoscomments";
import { TextAreaRefProps } from "@/ui";

type CommentProviderProps = {
  children: ReactNode;
};

type VideoCommentContextParams = {
  fieldRef: RefObject<TextAreaRefProps>;
  replyTo: VideoComment | null;
  setReplyTo: Dispatch<SetStateAction<VideoComment | null>>;
};

const VideoCommentContext = createContext({} as VideoCommentContextParams);

export function VideoCommentProvider({ children }: CommentProviderProps) {
  const fieldRef = useRef<TextAreaRefProps>(null);

  const [replyTo, setReplyTo] = useState<VideoComment | null>(null);

  return (
    <VideoCommentContext.Provider value={{ fieldRef, replyTo, setReplyTo }}>
      {children}
    </VideoCommentContext.Provider>
  );
}

export function useVideoCommentContext() {
  const context = useContext(VideoCommentContext);

  if (!context) {
    throw new Error("CommentProvider is required to use this hook");
  }

  return context;
}
