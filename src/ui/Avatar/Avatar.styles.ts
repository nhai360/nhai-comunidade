import * as Avatar from "@radix-ui/react-avatar";

import { styled } from "@/../stitches.config";

export const Root = styled(Avatar.Root, {
  width: "60px",
  height: "60px",
});

export const Image = styled(Avatar.Image, {
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  objectFit: "cover",
});

export const Fallback = styled(Avatar.Fallback, {
  width: "48px",
  height: "48px",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  background: "$neutral100",
  color: "$textPrimary",

  borderRadius: "50%",
});
