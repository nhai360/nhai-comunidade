import { styled } from "@/../stitches.config";

export const Container = styled("section", {
  marginLeft: "$28",
  transform: "translateY(-64px)",

  "@laptop": {
    marginLeft: 0,
    paddingInline: "$6",
  },
});

export const TabsContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$3",
});
