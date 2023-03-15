import { useState } from "react";

import { Button } from "@/ui";
import { EditIcon } from "@/ui/_icons";
import { EditProfileDialog } from "@/features/profile";

export function EditProfileButton() {
  const [isEditProfileDialogVisible, setIsEditProfileDialogVisible] =
    useState(false);

  return (
    <>
      <Button
        icon
        size="small"
        variant="transparent"
        onClick={() => setIsEditProfileDialogVisible(true)}
      >
        <EditIcon size={24} />
      </Button>

      {isEditProfileDialogVisible && (
        <EditProfileDialog
          onClose={() => setIsEditProfileDialogVisible(false)}
        />
      )}
    </>
  );
}
