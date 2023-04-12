import { styled } from "@/../stitches.config";

export const NavItem = styled("li", {
  height: "48px",
  width: "48px",

  display: "grid",
  placeItems: "center",

  borderRadius: "$medium",
  cursor: "pointer",

  color: "$textPrimary",
  transition: "all 0.2s",

  "&:hover": {
    background: "$pinkLight",
  },

  variants: {
    active: {
      true: {
        background: "$pinkMedium",
        color: "$neutral100",

        "&:hover": {
          background: "$pinkMedium",
        },
      },
    },
    disabled: {
      true: {
        cursor: "not-allowed",
        opacity: 0.5,
      },
    },
  },
});
