import { styled } from "@/../stitches.config";

export const Container = styled("ul", {
  display: "grid",
  gridTemplateColumns: "repeat(3, 306px)",
  gap: "$6",

  marginTop: "$6",
});
