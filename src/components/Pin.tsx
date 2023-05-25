import React from "react";
import { MdPushPin, MdOutlinePushPin } from "react-icons/md";

import UserContext from "../contexts/User";

interface Props {
  connectionId: string;
}

const Pin = ({ connectionId }: Props): JSX.Element => {
  const { pinnedConnectionId, setPinnedConnectionId } =
    React.useContext(UserContext);

  return (
    <button
      style={{
        opacity: pinnedConnectionId === connectionId ? 1 : 0,
        position: "absolute",
        right: 0,
        top: 0,
        border: "none",
        background: "none",
        cursor: "pointer",
      }}
      aria-label="pin"
      onClick={() => {
        if (setPinnedConnectionId) {
          if (pinnedConnectionId === connectionId) {
            setPinnedConnectionId("");
          } else {
            setPinnedConnectionId(connectionId);
          }
        }
      }}
    >
      {pinnedConnectionId === connectionId ? (
        <MdPushPin />
      ) : (
        <MdOutlinePushPin />
      )}
    </button>
  );
};

export default Pin;
