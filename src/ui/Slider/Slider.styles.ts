import * as Slider from "@radix-ui/react-slider";

import { styled } from "@/../stitches.config";

export const Root = styled(Slider.Root, {
  position: "relative",
  display: "flex",
  alignItems: "center",
  userSelect: "none",
  touchAction: "none",
  width: 100,
  height: 20,
});

export const Track = styled(Slider.Track, {
  backgroundColor: "$neutral400",
  position: "relative",
  flexGrow: 1,
  borderRadius: "5px",
  height: 3,
});

export const Range = styled(Slider.Range, {
  position: "absolute",
  backgroundColor: "$pinkMedium",
  borderRadius: "5px",
  height: "100%",
});

export const Thumb = styled(Slider.Thumb, {
  display: "block",
  width: 16,
  height: 16,
  backgroundColor: "$pinkMedium",
  borderRadius: 10,

  transition: "all 0.2s",
  outlineOffset: 2,
  outline: "2px solid transparent",

  "&:hover": { backgroundColor: "$pinkMedium" },
  "&:focus": { outlineColor: "$pinkMedium" },
});
