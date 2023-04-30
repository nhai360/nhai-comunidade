import { styled } from "@/../stitches.config";
import { Button } from "@/ui";

export const Container = styled("div", {
  position: "relative",

  height: "208px",
  width: "100%",

  borderTopLeftRadius: "$large",
  borderTopRightRadius: "$large",
});

export const Placeholder = styled("div", {
  height: "100%",
  width: "100%",

  borderTopLeftRadius: "$large",
  borderTopRightRadius: "$large",

  background: "linear-gradient(270.22deg, #F8E1AB 15.22%, #F2CFCB 99.86%)",

  "@laptop": {
    borderRadius: 0,
  },
});

export const EditButton = styled(Button, {
  position: "absolute",
  right: "12px",
  bottom: "12px",

  "@minLaptop": {
    top: "12px",
  },
});

export const Banner = styled("img", {
  height: "100%",
  width: "100%",

  borderTopLeftRadius: "$large",
  borderTopRightRadius: "$large",

  objectFit: "cover",
});
