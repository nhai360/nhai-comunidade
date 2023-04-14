import { styled, keyframes } from "@/../stitches.config";

const loadingAnimation = keyframes({
  to: {
    transform: "rotate(360deg)",
  },
});

export const Container = styled("div", {
  height: 20,
  width: 20,
  animation: `${loadingAnimation} 1s infinite linear`,
});
