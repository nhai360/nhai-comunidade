import { styled } from "@/../stitches.config";

export const Wrapper = styled("div", {
  maxWidth: "1880px",
  marginInline: "auto",
});

export const Content = styled("main", {
  display: "flex",
  flexDirection: "column",
});

export const Sider = styled("aside", {
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
