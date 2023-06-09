import { useMutation, useQueryClient } from "react-query";

import { authenticatedAPI } from "@/client";
import { invalidateVideosQueries } from "@/client/videos";

async function addVideoPlaylistRequest({ playlistId, videoId }: any) {
  const response = await authenticatedAPI.post(
    `/playlists/${playlistId}/videos/${videoId}`
  );

  return response?.data;
}

async function deleteVideoPlaylistRequest({ playlistId, videoId }: any) {
  const response = await authenticatedAPI.delete(
    `/playlists/${playlistId}/videos/${videoId}`
  );

  return response?.data;
}

export function useVideoPlaylist() {
  const queryClient = useQueryClient();

  const { mutate: addVideoPlaylist, ...AddRest } = useMutation({
    mutationFn: addVideoPlaylistRequest,
    onSuccess: () => {
      invalidateVideosQueries(queryClient);
    },
  });

  const { mutate: removeVideoPlaylist, ...deleteRest } = useMutation({
    mutationFn: deleteVideoPlaylistRequest,
    onSuccess: () => {
      invalidateVideosQueries(queryClient);
    },
  });

  return {
    add: { addVideoPlaylist, ...AddRest },
    remove: { removeVideoPlaylist, ...deleteRest },
  };
}
