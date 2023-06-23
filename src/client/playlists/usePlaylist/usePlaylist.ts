import { useQuery } from "react-query";

import { authenticatedAPI, decodeResponse } from "@/client";
import { GetPlaylistParams, Playlist, PlaylistDecoder } from "../types";

async function getPlaylist({ playlistId }: GetPlaylistParams) {
  const response = await authenticatedAPI.get(`/playlists/${playlistId}`);

  return decodeResponse<Playlist>(response, PlaylistDecoder);
}

export function usePlaylist({ playlistId }: GetPlaylistParams) {
  const { data: playlist, ...rest } = useQuery({
    enabled: !!playlistId,
    queryKey: ["playlist", { playlistId }],
    queryFn: () => getPlaylist({ playlistId }),
  });

  return {
    playlist,
    ...rest,
  };
}
