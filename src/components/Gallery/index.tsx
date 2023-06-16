import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
// import { IconButton, Center, Flex } from "@chakra-ui/react";

import UserContext from "../../contexts/Participant";

import { useSpace } from "../../hooks/useSpace";

import Participant from "../Participant";
import ParticipantAudio from "../ParticipantAudio";
import GalleryLayout from "../GalleryLayout";
import { useParticipantMedia } from "@/hooks/useParticipantMedia";
import { Live } from "@/client/lives";
// import ChevronLeftIcon from "@/components/icons/ChevronLeftIcon";
// import ChevronRightIcon from "@/components/icons/ChevronRightIcon";

function pushToFront<T>(array: T[], element: T) {
  const index = array.findIndex((el) => el === element);
  if (index) {
    array.splice(index, 1);
    array.unshift(element);
  }
}

interface Props {
  gap: number;
  width: number;
  height: number;
  participantsPerPage: number;
  live: Live;
}

export default function Gallery({
  gap,
  width,
  height,
  live,
  participantsPerPage,
}: Props): JSX.Element {
  const didPopulateDevicesRef = useRef(false);
  const { requestPermissionAndPopulateDevices } = useParticipantMedia();

  useEffect(() => {
    if (didPopulateDevicesRef.current === false) {
      didPopulateDevicesRef.current = true;
      requestPermissionAndPopulateDevices();
    }
  }, [requestPermissionAndPopulateDevices]);

  const [currentPage, setCurrentPage] = useState(1);
  const {
    connectionIds,
    participantCount,
    localParticipantConnectionId,
    screenShareParticipantConnectionId,
  } = useSpace();
  const { pinnedConnectionId } = React.useContext(UserContext);

  const orderedConnectionIds = useMemo(() => {
    const ids = [...connectionIds];
    [
      screenShareParticipantConnectionId,
      pinnedConnectionId,
      localParticipantConnectionId,
    ].forEach((id) => {
      if (id) {
        pushToFront(ids, id);
      }
    });

    return ids;
  }, [
    connectionIds,
    localParticipantConnectionId,
    pinnedConnectionId,
    screenShareParticipantConnectionId,
  ]);

  const numberPages = useMemo(() => {
    if (participantCount >= participantsPerPage) {
      return Math.ceil(participantCount / participantsPerPage);
    } else {
      return 1;
    }
  }, [participantCount, participantsPerPage]);

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((page) => page - 1);
    }
  }, [currentPage]);

  const paginatedConnectionIds = useMemo(() => {
    const startIndex = currentPage * participantsPerPage - participantsPerPage;
    const endIndex = startIndex + participantsPerPage;
    const pageParticipants = orderedConnectionIds.slice(startIndex, endIndex);
    // if there are no participants, then only the local view will show up on the page
    // we need to go back to the previous page.
    if (pageParticipants.length === 0) {
      goToPreviousPage();
    }
    return pageParticipants;
  }, [
    orderedConnectionIds,
    currentPage,
    participantsPerPage,
    goToPreviousPage,
  ]);

  const hidePaginateCtrlRight = currentPage === numberPages;

  const hidePaginateCtrlLeft = currentPage === 1;

  const goToNextPage = () => {
    if (currentPage < numberPages) {
      setCurrentPage((page) => page + 1);
    }
  };

  const widthBetweenPagination = numberPages === 1 ? width : width - 0;

  return (
    <div
      style={{
        height: "100%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* <div style={{width: 40, marginLeft:12,}}>
        <IconButton
          aria-label="Paginate left"
          icon={<ChevronLeftIcon />}
          isRound={true}
          onClick={goToPreviousPage}
          opacity={numberPages === 1 ? 0 : 1}
          hidden={hidePaginateCtrlLeft}
          variant="outline"
          border="1px"
          borderColor="#666666"
          backgroundColor="#383838"
          _hover={{
            border: "1px solid #CCCCCC",
            backgroundColor: "#383838",
          }}
          _active={{
            border: "1px solid #CCCCCC",
            backgroundColor: "#444444",
          }}
        />
      </div> */}
      <div style={{ width: width, height: "100%" }}>
        {connectionIds.map((connectionId) => (
          <ParticipantAudio key={connectionId} connectionId={connectionId} />
        ))}
        <GalleryLayout
          width={widthBetweenPagination}
          height={height}
          gap={gap - 6}
        >
          {paginatedConnectionIds.map((connectionId) => {
            return (
              <Participant
                live={live}
                key={connectionId}
                connectionId={connectionId}
              />
            );
          })}
        </GalleryLayout>
      </div>
      {/* <Center w="40px" marginRight="12px">
        <IconButton
          aria-label="Paginate right"
          icon={<ChevronRightIcon />}
          isRound={true}
          opacity={numberPages === 1 ? 0 : 1}
          hidden={hidePaginateCtrlRight}
          variant="outline"
          border="1px"
          borderColor="#666666"
          onClick={goToNextPage}
          backgroundColor="#383838"
          _hover={{
            border: "1px solid #CCCCCC",
            backgroundColor: "#383838",
          }}
          _active={{
            border: "1px solid #CCCCCC",
            backgroundColor: "#444444",
          }}
          zIndex={2}
        />
      </Center> */}
    </div>
  );
}
