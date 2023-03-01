import * as Checkbox from "@radix-ui/react-checkbox";
import { styled } from "@/../stitches.config";

export const Container = styled("div", {
  display: "flex",
  alignItems: "center",
  columnGap: "$4",

  label: {
    fontWeight: 700,
  },
});

export const Root = styled(Checkbox.Root, {
  boxShadow: "$xs",
  height: "20px",
  width: "20px",
  background: "$neutral200",
  border: "1px solid $neutral400",
  borderRadius: "$small",
  transition: "all 0.2s",

  "&:not(:disabled):hover": {
    border: "3px solid rgba(35, 55, 55, 0.05)",
  },

  '&[data-state="checked"]': {
    borderColor: "$pinkMedium",
    backgroundColor: "$pinkMedium",
    color: "$neutral100",
  },

  "&:disabled": {
    cursor: "not-allowed",
    borderColor: "transparent",
    backgroundColor: "$neutral300",
    color: "$textAuxiliary",
  },
});

export const Indicator = styled(Checkbox.Indicator, {
  display: "grid",
  placeItems: "center",
});
