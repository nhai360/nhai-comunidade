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

  height: "calc(100vh - 160px)",
  padding: "$6",
});
