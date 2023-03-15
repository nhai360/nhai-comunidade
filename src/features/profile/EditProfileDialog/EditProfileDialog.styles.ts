import { styled } from "@/../stitches.config";
import { Button, Dialog } from "@/ui";

export const Form = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "$6",
});

export const DialogBody = styled(Dialog.Body, {
  padding: "$8 $16",
});

export const DialogFooter = styled(Dialog.Footer, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderTop: "1px solid $neutral200",
  padding: "$4",
});

export const SubmitButton = styled(Button, {
  width: "236px",
});
