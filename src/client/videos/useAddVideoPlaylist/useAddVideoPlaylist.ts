import { useMutation, useQueryClient } from "react-query";

import { authenticatedAPI } from "@/client";
import { invalidateVideosQueries } from "@/client/videos";

async function addVideoPlaylistRequest({ playlistId, videoId }: any) {
  const response = await authenticatedAPI.post(
    `/playlists/${playlistId}/videos/${videoId}`
  );

  return response?.data;
}

export function useAddVideoPlaylist() {
  const queryClient = useQueryClient();

  const { mutate: addVideoPlaylist, ...rest } = useMutation({
    mutationFn: addVideoPlaylistRequest,
    onSuccess: () => {
      invalidateVideosQueries(queryClient);
    },
  });

  return {
    addVideoPlaylist,
    ...rest,
  };
}
