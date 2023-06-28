import { styled } from "@/../stitches.config";

export const Container = styled("div", {
  display: "none",

  "@mobile": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
