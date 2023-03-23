import { styled, keyframes } from "@/../stitches.config";

const loadingAnimation = keyframes({
  to: {
    transform: "rotate(360deg)",
  },
});

export const Container = styled("button", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  columnGap: "$2",
  borderRadius: "$medium",
  border: 0,

  fontFamily: "$body",
  fontSize: "$body2",
  fontWeight: 700,
  lineHeight: "150%",
  letterSpacing: "0.04rem",

  transition: "all 0.2s",

  "&:disabled": {
    background: "$neutral500",
    color: "$textPrimary",
    cursor: "not-allowed",
  },

  variants: {
    icon: {
      true: {
        width: "48px",
        height: "48px",
        color: "$textTitle !important",
        padding: "0 !important",

        "&:focus-visible": {
          background: "$blueLight",
        },

        "&:not(:disabled):hover": {
          background: "$blueLight",
        },
      },
    },
    variant: {
      primary: {
        color: "$neutral100 !important",
        background: "$blueMedium",

        "&:not(:disabled):hover": {
          background: "$blueDark !important",
        },
      },
      light: {
        color: "$textPrimary !important",
        background: "$blueLight",

        "&:not(:disabled):hover": {
          background: "$blueMedium !important",
          color: "$neutral100 !important",
        },
      },
      outline: {
        background: "transparent",
        color: "$textPrimary",
        border: "2px solid $blueMedium",
      },
      transparent: {
        background: "transparent",
        color: "$blueDark",
      },
    },
    size: {
      large: {
        padding: "$4 $6",
      },
      medium: {
        padding: "$3 $4",
      },
      small: {
        padding: "$2 $3",
      },
    },
    fullWidth: {
      true: {
        width: "100%",
      },
    },
    ghost: {
      true: {
        padding: "0 !important",
        height: "auto !important",
        width: "auto !important",
        background: "transparent !important",

        "&:hover": {
          background: "transparent !important",
          opacity: 0.6,
        },
      },
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "large",
    fullWidth: false,
    icon: false,
    ghost: false,
  },

  compoundVariants: [
    {
      icon: true,
      size: "small",
      css: {
        height: "40px",
        width: "40px",
      },
    },
    {
      icon: false,
      variant: "transparent",
      css: {
        "&:not(:disabled):hover": {
          color: "$neutral100",
          background: "$blueDark !important",
        },
      },
    },
  ],
});

export const Loading = styled("div", {
  height: 20,
  width: 20,
  animation: `${loadingAnimation} 1s infinite linear`,
});
