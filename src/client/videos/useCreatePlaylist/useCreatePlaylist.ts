import { useMutation, useQueryClient } from "react-query";

import { authenticatedAPI } from "@/client";
import { PostPlaylistParams } from "@/client/playlists";
import { invalidatePlaylistsQueries } from "..";

async function createPlaylistRequest(params: PostPlaylistParams) {
  const response = await authenticatedAPI.post("/playlists", params);

  return response?.data;
}

export function useCreatePlaylist() {
  const queryClient = useQueryClient();

  const { mutate: createPlaylist, ...rest } = useMutation({
    mutationFn: createPlaylistRequest,
    onSuccess: () => {
      invalidatePlaylistsQueries(queryClient);
    },
  });

  return {
    createPlaylist,
    ...rest,
  };
}
