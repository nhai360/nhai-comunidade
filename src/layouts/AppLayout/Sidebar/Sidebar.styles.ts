import { styled } from "@/../stitches.config";

export const Container = styled("aside", {
  width: "80px",
  position: "fixed",
  top: 80,
  bottom: 0,

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",

  paddingBlock: "$20 $8",
});

export const NavigationList = styled("ul", {
  display: "flex",
  flexDirection: "column",
  gap: "$4",
});

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
  },
});
