import { styled } from "@/../stitches.config";

export const Content = styled("main", {
  display: "flex",
  flexDirection: "column",
});

export const Sider = styled("aside", {
  // position: "fixed",
  // top: "calc(80px + $6)",
  // right: "$6",

  display: "flex",
  flexDirection: "column",
  gap: "$6",
});

export const SimpleGrid = styled("div", {
  marginLeft: "80px",
  padding: "$6",
});

export const GridWithSider = styled("div", {
  marginLeft: "80px",
  padding: "$6",

  display: "grid",
  gridTemplateColumns: "auto 416px",
  gap: "$6",
});
