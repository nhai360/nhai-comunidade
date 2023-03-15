import { styled } from "@/../stitches.config";

export const Container = styled("div", {
  position: "relative",

  height: "4px",
  borderRadius: "3px",
  background: "rgba(50, 50, 50, 0.16)",
});

export const Filled = styled("div", {
  position: "absolute",
  left: 0,

  width: 0,
  height: "4px",

  background:
    "linear-gradient(90deg, #F23D80 0%, #FFC700 30.98%, #63D130 60.93%, #00A0FF 99.14%)",
  boxShadow: "0px 0px 9px rgba(251, 200, 2, 0.21)",
  borderRadius: "3px",
});
