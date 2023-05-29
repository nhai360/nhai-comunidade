import { useMutation, useQueryClient } from "react-query";

import { authenticatedAPI } from "@/client";
import { PostPlaylistParams, invalidateVideosQueries } from "@/client/videos";

async function createPlaylistRequest(params: PostPlaylistParams) {
  const response = await authenticatedAPI.post("/playlists", params);

  return response?.data;
}

export function useCreatePlaylist() {
  const queryClient = useQueryClient();

  const { mutate: createPlaylist, ...rest } = useMutation({
    mutationFn: createPlaylistRequest,
    onSuccess: () => {
      invalidateVideosQueries(queryClient);
    },
  });

  return {
    createPlaylist,
    ...rest,
  };
}
