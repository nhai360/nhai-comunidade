import { useQuery } from "react-query";

import { authenticatedAPI, decodeResponse } from "@/client";
import { GetUserPlaylistsParams } from "@/client/videos/types";
import { Playlist, PlaylistDecoder } from "@/client/playlists";

async function getUserPlaylists({ userId }: GetUserPlaylistsParams) {
  const response = await authenticatedAPI.get(`/users/${userId}/playlists`);

  return decodeResponse<Playlist[]>(response, PlaylistDecoder.array());
}

export function useUserPlaylists({ userId }: GetUserPlaylistsParams) {
  const { data: userplaylists, ...rest } = useQuery({
    enabled: !!userId,
    queryKey: ["userplaylists", { userId }],
    queryFn: () => getUserPlaylists({ userId }),
  });

  return {
    userplaylists,
    ...rest,
  };
}
