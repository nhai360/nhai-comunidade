import { styled } from "@/../stitches.config";

export const Container = styled("div", {
  position: "relative",
});

export const ReorderIcon = styled("button", {
  position: "absolute !important",
  right: "$3 !important",
  top: "50% !important",

  transform: "translateY(-50%) !important",

  all: "unset",
  cursor: "grab",
});
