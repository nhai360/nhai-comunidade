import * as Avatar from "@radix-ui/react-avatar";

import { styled } from "@/../stitches.config";
import { Tag } from "@/ui";

export const Root = styled(Avatar.Root, {
  position: "relative",
});

export const Image = styled(Avatar.Image, {
  objectFit: "cover",

  variants: {
    size: {
      large: {
        width: "72px",
        height: "72px",
        borderRadius: "$medium",
      },
      medium: {
        width: "56px",
        height: "56px",
        borderRadius: "$medium",
      },
      small: {
        width: "42px",
        height: "42px",
        borderRadius: "8px",
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

  variants: {
    size: {
      large: {
        width: "72px",
        height: "72px",
        borderRadius: "$medium",
      },
      medium: {
        width: "56px",
        height: "56px",
        borderRadius: "$medium",
      },
      small: {
        width: "42px",
        height: "42px",
        borderRadius: "8px",
      },
    },
  },

  defaultVariants: {
    size: "medium",
  },
});

export const LevelTag = styled(Tag, {
  position: "absolute",
  zIndex: 1,

  left: "50%",
  bottom: "-10px",
  transform: "translateX(-50%)",
});
