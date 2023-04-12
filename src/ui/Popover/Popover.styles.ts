/* eslint-disable import/export */
import * as Popover from "@radix-ui/react-popover";

import { styled } from "@/../stitches.config";

export const Content = styled(Popover.Content, {
  background: "$neutral100",
  border: "1px solid $neutral300",
  boxShadow: "-5px 9px 16px rgba(40, 69, 96, 0.08)",

  zIndex: "$fixed",

  variants: {
    size: {
      small: {
        padding: "$2",
        borderRadius: "$medium",
      },
      medium: {
        padding: "$6",
        borderRadius: "$large",
      },
    },
  },

  defaultVariants: {
    size: "small",
  },
});

export const Action = styled("button", {
  padding: "$1 $2",
  borderRadius: "8px",
  background: "$neutral100",
  transition: "all 0.2s",

  border: 0,
  width: "100%",
  height: "32px",

  textAlign: "left",

  "&:hover": {
    background: "$neutral300",
  },
});

export * from "@radix-ui/react-popover";
