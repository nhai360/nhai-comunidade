import { styled } from "@/../stitches.config";

export const Wrapper = styled("div", {
  maxWidth: "1880px",
  marginInline: "auto",

  "@laptop": {
    maxWidth: "100vw",
  },
});

export const Content = styled("main", {
  display: "flex",
  flexDirection: "column",
});

export const Sider = styled("aside", {
  display: "flex",
  flexDirection: "column",
  gap: "$6",

  "@laptop": {
    display: "none",
  },
});

export const SimpleGrid = styled("div", {
  marginLeft: "80px",
  padding: "$6",

  "@laptop": {
    marginLeft: 0,
  },
});

export const GridWithSider = styled("div", {
  marginLeft: "80px",
  padding: "$6",

  display: "grid",
  gridTemplateColumns: "auto 416px",
  gap: "$6",

  "@laptop": {
    marginLeft: 0,
    gridTemplateColumns: "1fr",
  },
});
