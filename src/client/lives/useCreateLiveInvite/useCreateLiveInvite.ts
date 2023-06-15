import { useMutation, useQueryClient } from "react-query";

import { authenticatedAPI } from "@/client";
import {
  PostLiveInviteParams,
  PostParams,
  invalidateLivesQueries,
} from "@/client/lives";

async function createLiveInviteRequest(params: PostLiveInviteParams) {
  const { liveId, ...restParams } = params;
  const response = await authenticatedAPI.post(`/lives/${liveId}/invite`, {
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
