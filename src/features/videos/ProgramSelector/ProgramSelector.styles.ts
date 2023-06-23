import { styled } from "@/../stitches.config";

export const Container = styled("div", {});

export const PlaylistHighlight = styled("div", {
  backgroundColor: "$pinkLight",
  padding: "24px 0 20px 0",
  borderRadius: "$large",
  marginBottom: 24,
});

export const VideosGridContainer = styled("div", {
  gap: "$4",
  margin: "16px 0 12px",
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
});
