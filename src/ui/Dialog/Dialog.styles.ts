import * as Dialog from "@radix-ui/react-dialog";

import { styled, keyframes } from "@/../stitches.config";

export const Root = styled(Dialog.Root, {});

export const Trigger = styled(Dialog.Trigger, {});

export const Portal = styled(Dialog.Portal, {});

const overlayFadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

export const Overlay = styled(Dialog.Overlay, {
  position: "fixed",
  inset: 0,
  background: "rgba(0, 0, 0, 0.25)",
  animation: `${overlayFadeIn} 1s`,
});

export const Content = styled(Dialog.Content, {
  background: "$neutral100",
  borderRadius: "$large",
  border: "1px solid $neutral200",

  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  minWidth: "856px",
});

export const Header = styled("header", {
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

export const Body = styled("main", {
  padding: "$4 $6 $6 $6",
});
