import { styled } from "@/../stitches.config";

export const Container = styled("aside", {
  width: "80px",
  position: "fixed",
  top: 80,
  bottom: 0,

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",

  paddingBlock: "$20 $8",
  zIndex: "$alwaysOnTop",

  "@laptop": {
    display: "none",
  },
});

export const NavigationList = styled("ul", {
  display: "flex",
  flexDirection: "column",
  gap: "$4",
});
