import { styled } from "@/../stitches.config";

export const FlexContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  gap: "$6",
  maxHeight: 320,

  "@media (max-width: 768px)": {
    flexDirection: "column-reverse",
    gap: "$2",
    maxHeight: "auto",
  },
});

export const Content = styled("div", {
  display: "flex",
  flex: 0.6,
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "$8",
});

export const Actions = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$3",

  "@media (max-width: 768px)": {
    width: "100%",
    flexDirection: "column-reverse",
    gap: "$2",
  },
});

export const Thumbnail = styled("img", {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "24px",
});
