import { Author } from "@/client/posts";

export type Comment = {
  id: string;
  content: string;
  author: Author;
  likesCount: number;
  createdAt: Date;
  replies?: Comment[];
};

export type CommentWithColor = {
  color: "green" | "pink" | "blue";
} & Comment;
