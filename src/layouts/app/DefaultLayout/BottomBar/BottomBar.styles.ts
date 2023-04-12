import { styled } from "@/../stitches.config";

export const Container = styled("footer", {
  position: "fixed",

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  width: "100vw",
  height: "72px",

  bottom: 0,
  paddingInline: "$6",
});
