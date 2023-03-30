import { styled } from "@/../stitches.config";

export const PostList = styled("ul", {
  display: "flex",
  overflowX: "auto",

  gap: "$4",
  marginTop: "$3",

  maxWidth: "368px",

  "&::-webkit-scrollbar": {
    width: 0,
    height: 0,
    display: "none",
  },

  scrollbarWidth: "none",
});

export const PostItem = styled("li", {
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  width: "112px",

  gap: "$2",
});
