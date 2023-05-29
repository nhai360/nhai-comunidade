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
import { TextAreaRefProps } from "@/ui";
import { Comment } from "@/client/comments";

type CommentProviderProps = {
  children: ReactNode;
};

type VideoCommentContextParams = {
  fieldRef: RefObject<TextAreaRefProps>;
  replyTo: Comment | null;
  setReplyTo: Dispatch<SetStateAction<Comment | null>>;
};

const VideoCommentContext = createContext({} as VideoCommentContextParams);

export function VideoCommentProvider({ children }: CommentProviderProps) {
  const fieldRef = useRef<TextAreaRefProps>(null);

  const [replyTo, setReplyTo] = useState<Comment | null>(null);

  return (
    <VideoCommentContext.Provider value={{ fieldRef, replyTo, setReplyTo }}>
      {children}
    </VideoCommentContext.Provider>
  );
}

export function useVideoCommentContext() {
  const context = useContext(VideoCommentContext);

  if (!context) {
    throw new Error("VideoCommentProvider is required to use this hook");
  }

  return context;
}
