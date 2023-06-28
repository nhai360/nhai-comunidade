import { styled } from "@/../stitches.config";

export const Container = styled("div", {
  display: "none",
  padding: "$4",

  "@mobile": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export const Action = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$6",
});
