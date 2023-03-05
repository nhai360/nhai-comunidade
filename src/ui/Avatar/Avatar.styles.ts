import * as Avatar from "@radix-ui/react-avatar";

import { styled } from "@/../stitches.config";

export const Root = styled(Avatar.Root, {
  width: "56px",
  height: "56px",
});

export const Image = styled(Avatar.Image, {
  width: "46px",
  height: "46px",
  borderRadius: "50%",
  objectFit: "cover",
});

export const Fallback = styled(Avatar.Fallback, {
  width: "46px",
  height: "46px",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  background: "$neutral100",
  color: "$textPrimary",

  borderRadius: "50%",
});
