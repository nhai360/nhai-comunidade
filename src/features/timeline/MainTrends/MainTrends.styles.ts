import { styled } from "@/../stitches.config";
import { Tag } from "@/ui";

export const Header = styled("header", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const Actions = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$2",
});

export const TrendList = styled("ul", {
  display: "flex",
  flexDirection: "column",
});

export const TrendItem = styled("li", {
  display: "flex",
  alignItems: "center",
  gap: "$4",

  paddingBlock: "$4",
  borderBottom: "2px solid $neutral200",

  "&:last-child": {
    paddingBottom: "$2",
    borderBottomColor: "transparent",
  },
});

export const TrendItemContent = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginRight: "auto",
});

export const TagFromStatus = styled(Tag, {
  marginBottom: "$2",
});
