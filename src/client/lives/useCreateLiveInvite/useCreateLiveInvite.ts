import { useMutation, useQueryClient } from "react-query";

import { authenticatedAPI } from "@/client";
import {
  PostLiveInviteParams,
  PostParams,
  invalidateLivesQueries,
} from "@/client/lives";

async function createLiveInviteRequest(params: PostLiveInviteParams) {
  const { liveId, guestId, ...restParams } = params;
  const response = await authenticatedAPI.post(`/lives/${liveId}/invite`, {
    guests: [guestId],
    ...restParams,
  });

  return response.data;
}

export function useCreateLiveInvite() {
  const queryClient = useQueryClient();

  const { mutate: createLiveInvite, ...rest } = useMutation({
    mutationFn: createLiveInviteRequest,
    onSuccess: () => {
      invalidateLivesQueries(queryClient);
    },
  });

  return {
    createLiveInvite,
    ...rest,
  };
}
