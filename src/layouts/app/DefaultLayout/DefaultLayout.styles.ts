import { styled } from "@/../stitches.config";

export const Wrapper = styled("div", {
  display: "flex",
  flexDirection: "column",

  "@minLaptop": {
    display: "none",
  },
});

export const Content = styled("main", {
  display: "flex",
  flexDirection: "column",

  overflowY: "scroll",

  height: "100vh",
  padding: "$6",
});
