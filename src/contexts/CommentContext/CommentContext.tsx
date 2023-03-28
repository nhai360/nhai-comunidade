import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { Comment } from "@/client/comments";

type CommentProviderProps = {
  children: ReactNode;
};

type CommentContextParams = {
  replyTo: Comment | null;
  setReplyTo: Dispatch<SetStateAction<Comment | null>>;
};

const CommentContext = createContext({} as CommentContextParams);

export function CommentProvider({ children }: CommentProviderProps) {
  const [replyTo, setReplyTo] = useState<Comment | null>(null);

  return (
    <CommentContext.Provider value={{ replyTo, setReplyTo }}>
      {children}
    </CommentContext.Provider>
  );
}

export function useCommentContext() {
  const context = useContext(CommentContext);

  if (!context) {
    throw new Error("CommentProvider is required to use this hook");
  }

  return context;
}
