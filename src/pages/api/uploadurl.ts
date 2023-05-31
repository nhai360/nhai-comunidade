import { getToken } from "@/lib/auth";
import Mux from "@mux/mux-node";
import { NextApiRequest, NextApiResponse } from "next";

const tokenId = process.env.MUX_TOKEN_ID as string;
const tokenSecret = process.env.MUX_TOKEN_SECRET as string;

const muxClient = new Mux(tokenId, tokenSecret);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method now allowed." });

    return;
  }

  const authorizationHeader = req.headers.authorization;
  const token = authorizationHeader
    ? authorizationHeader.replace("Bearer ", "")
    : null;

  if (!token) {
    res.status(401).json({ message: "Unauthorized." });
    return;
  }

  try {
    const { Video } = muxClient;

    const assets = await Video.Assets.list({
      upload_id: req?.body?.uploadId,
    });
    // upload.url is what you'll want to return to your client.

    if (!assets) {
      res.status(404).json({ message: "Asset not found" });
      return;
    }

    const playbackId = assets
      .map((asset) => asset.playback_ids?.map((playbackId) => playbackId?.id))
      .flat()[0];

    if (!playbackId) {
      res.status(404).json({ message: "Playback ID not found" });
      return;
    }

    res
      .status(200)
      .json({ sourceUrl: `https://stream.mux.com/${playbackId}.m3u8` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
