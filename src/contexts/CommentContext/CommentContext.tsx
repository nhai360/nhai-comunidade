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
import { Comment } from "@/client/comments";
import { TextAreaRefProps } from "@/ui";

type CommentProviderProps = {
  children: ReactNode;
};

type CommentContextParams = {
  fieldRef: RefObject<TextAreaRefProps>;
  replyTo: Comment | null;
  setReplyTo: Dispatch<SetStateAction<Comment | null>>;
};

const CommentContext = createContext({} as CommentContextParams);

export function CommentProvider({ children }: CommentProviderProps) {
  const fieldRef = useRef<TextAreaRefProps>(null);

  const [replyTo, setReplyTo] = useState<Comment | null>(null);

  return (
    <CommentContext.Provider value={{ fieldRef, replyTo, setReplyTo }}>
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
