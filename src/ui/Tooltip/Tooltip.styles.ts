import { styled } from "@/../stitches.config";

export const Container = styled("div", {
  opacity: 0,
  visibility: "hidden",

  transition: "all 0.2s",
});

export const Message = styled("span", {
  position: "absolute",

  color: "$textPrimary",
  background: "$neutral100",
  border: "1px solid $neutral200",
  borderRadius: "$small",

  padding: "$2 $3",
  transition: "all 0.2s",
  zIndex: "$middle",

  whiteSpace: "nowrap",

  variants: {
    position: {
      top: {
        top: 0,
        left: "50%",
        transform: "translate(-50%, calc(-100% - 14px))",
      },
      bottom: {
        bottom: 0,
        left: "50%",
        transform: "translate(-50%, calc(100% + 14px))",
      },
      right: {
        right: 0,
        top: "50%",
        transform: "translate(calc(100% + 16px), -50%)",
      },
      left: {
        right: "calc(100% + 16px)",
        top: "50%",
        transform: "translateY(-50%)",
      },
    },
  },

  defaultVariants: {
    position: "top",
  },
});

export const BaseElement = styled("div", {
  position: "relative",

  [`&:hover ${Container}`]: {
    opacity: 1,
    visibility: "visible",
  },
});

export const Indicator = styled("div", {
  position: "absolute",

  background: "$neutral100",
  border: "1px solid $neutral200",

  height: "10px",
  width: "10px",

  transition: "all 0.2s",
  zIndex: "$middle",

  variants: {
    position: {
      top: {
        left: "50%",
        bottom: "-8px",
        top: "-19px",
        transform: "translateX(-50%) rotate(-45deg)",
        borderTopColor: "transparent",
        borderRightColor: "transparent",
      },
      bottom: {
        left: "50%",
        bottom: "-19px",
        transform: "translateX(-50%) rotate(-45deg)",
        borderBottomColor: "transparent",
        borderLeftColor: "transparent",
      },
      right: {
        top: "50%",
        left: "calc(100% + 12px)",
        transform: "translateY(-50%) rotate(-45deg)",
        borderBottomColor: "transparent",
        borderRightColor: "transparent",
      },
      left: {
        top: "50%",
        right: "calc(100% + 12px)",
        transform: "translateY(-50%) rotate(-45deg)",
        borderTopColor: "transparent",
        borderLeftColor: "transparent",
      },
    },
  },

  defaultVariants: {
    position: "top",
  },
});
