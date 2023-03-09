import { styled } from "@/../stitches.config";

export const Container = styled("li", {
  display: "flex",
  alignItems: "flex-start",
  gap: "$3",
});

export const CommentHeader = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const CommentHeaderActions = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$4",
});

export const CommentContent = styled("div", {
  padding: "$4",
  background: "$pinkLight",
  borderRadius: "$medium",
  marginTop: "$1",
});
