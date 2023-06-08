import * as Dialog from "@radix-ui/react-dialog";

import { styled, keyframes } from "@/../stitches.config";

export const Root = Dialog.Root;

export const Trigger = Dialog.Trigger;

export const Portal = Dialog.Portal;

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
  zIndex: "$fixed",
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
  zIndex: "$fixed",

  "::-webkit-scrollbar": {
    display: "none",
  },

  "-ms-overflow-style": "none",
  scrollbarWidth: "none",

  "@laptop": {
    minWidth: 0,
    maxWidth: "90vw",
    width: "100%",
  },
});

export const Body = styled("main", {
  margin: "$4 $6 $6 $6",
  overflowY: "auto",
  maxHeight: "75vh",
});

export const Footer = styled("footer", {
  padding: "0 $6 $6 $6",
});
