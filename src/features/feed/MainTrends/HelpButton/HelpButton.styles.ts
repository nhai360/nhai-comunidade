import { styled } from "@/../stitches.config";

export const Tooltip = styled("span", {
  position: "absolute",
  right: "50%",
  top: "calc(100% + 16px)",

  opacity: 0,
  visibility: "hidden",

  width: "217px",
  padding: "$3",

  background: "$neutral100",
  border: "1px solid $neutral300",
  borderRadius: "$medium",
  borderTopRightRadius: 0,
});

export const Container = styled("div", {
  position: "relative",

  [`&:hover ${Tooltip}`]: {
    opacity: 1,
    visibility: "visible",
  },
});
