import { useMutation, useQueryClient } from "react-query";

import { authenticatedAPI } from "@/client";
import { invalidateVideosQueries } from "@/client/videos";

async function removeVideoPlaylistRequest({ playlistId, videoId }: any) {
  const response = await authenticatedAPI.delete(
    `/playlists/${playlistId}/videos/${videoId}`
  );

  return response?.data;
}

export function useRemoveVideoPlaylist() {
  const queryClient = useQueryClient();

  const { mutate: removeVideoPlaylist, ...rest } = useMutation({
    mutationFn: removeVideoPlaylistRequest,
    onSuccess: () => {
      invalidateVideosQueries(queryClient);
    },
  });

  return {
    removeVideoPlaylist,
    ...rest,
  };
}
