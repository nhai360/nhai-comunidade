import * as Avatar from "@radix-ui/react-avatar";

import { styled } from "@/../stitches.config";

export const Root = styled(Avatar.Root, {
  width: "56px",
  height: "56px",
});

export const Image = styled(Avatar.Image, {
  borderRadius: "50%",
  objectFit: "cover",

  variants: {
    size: {
      xlarge: {
        width: "128px",
        height: "128px",
      },
      large: {
        width: "72px",
        height: "72px",
      },
      medium: {
        width: "46px",
        height: "46px",
      },
      small: {
        width: "42px",
        height: "42px",
      },
    },
  },

  defaultVariants: {
    size: "medium",
  },
});

export const Fallback = styled(Avatar.Fallback, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  background: "$neutral100",
  color: "$textPrimary",

  borderRadius: "50%",

  variants: {
    size: {
      xlarge: {
        width: "128px",
        height: "128px",
      },
      large: {
        width: "72px",
        height: "72px",
      },
      medium: {
        width: "46px",
        height: "46px",
      },
      small: {
        width: "42px",
        height: "42px",
      },
    },
  },

  defaultVariants: {
    size: "medium",
  },
});
