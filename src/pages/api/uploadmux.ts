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

    const upload = await Video.Uploads.create({
      cors_origin: "https://contaiapp.com",
      new_asset_settings: {
        playback_policy: "public",
      },
    });

    // upload.url is what you'll want to return to your client.
    res.status(200).json({ id: upload.id, url: upload.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
