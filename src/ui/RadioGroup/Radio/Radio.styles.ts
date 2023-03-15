import * as RadioGroup from "@radix-ui/react-radio-group";

import { styled } from "@/../stitches.config";

export const Container = styled(RadioGroup.Item, {
  position: "relative",

  background: "$neutral200",
  height: "16px",
  width: "16px",

  borderRadius: "50%",
  border: "1px solid $neutral100",

  variants: {
    color: {
      green: {
        background: "$greenMedium",
      },
      pink: {
        background: "$pinkMedium",
      },
      blue: {
        background: "$blueMedium",
      },
    },
  },
});

export const Indicator = styled(RadioGroup.Indicator, {
  border: "1px solid $blueMedium",
  borderRadius: "50%",

  width: "18px",
  height: "18px",

  display: "flex",
  zIndex: -1,

  position: "absolute",
  top: "50%",
  left: "50%",

  transform: "translate(-50%, -50%)",
});
