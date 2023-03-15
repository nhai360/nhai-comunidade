import * as Dialog from "@radix-ui/react-dialog";

import { styled } from "@/../stitches.config";

export const Container = styled("header", {
  display: "flex",
  alignItems: "center",
  padding: "$4",

  width: "100%",
});

export const Title = styled(Dialog.Title, {
  fontWeight: 500,
  fontSize: "$h3",
  fontFamily: "$heading",
  lineHeight: "$h3",
  marginInline: "auto",
});

export const Close = styled(Dialog.Close, {
  marginLeft: "auto",
  color: "$textPrimary",

  position: "absolute",
  right: 10,
});
