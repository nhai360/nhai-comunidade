// import { Author } from "@/client/posts";

export type Comment = {
  id: string;
  content: string;
  author: any;
  likesCount: number;
  createdAt: Date;
  replies?: Comment[];
  options?: string[];
};

export type CommentWithColor = {
  color: "green" | "pink" | "yellow";
} & Comment;
