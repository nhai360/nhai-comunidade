import { styled } from "@/../stitches.config";

export const Container = styled("ul", {
  display: "grid",
  gridTemplateColumns: "repeat(3, 306px)",
  gap: "$6",

  marginTop: "$6",
});

export const PlaylistHighlight = styled("div", {
  backgroundColor: "$blueLight",
  padding: "24px 0 20px 0",
  borderRadius: "$large",
  marginTop: 16,
});

export const VideosGridContainer = styled("div", {
  gap: "$4",
  margin: "16px 0 12px",
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
});
