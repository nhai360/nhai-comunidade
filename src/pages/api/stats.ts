import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const { MUX_SIGNING_KEY, MUX_PRIVATE_KEY } = process.env;

type ResponseData = {
  spaceJWT: string;
};

function signJWT(playbackId: string): ResponseData {
  const JWT = jwt.sign(
    {
      sub: playbackId,
      aud: "playback_id",
      exp: Date.now() + 600, // UNIX Epoch seconds when the token expires
      kid: MUX_SIGNING_KEY ?? "",
    },
    Buffer.from(MUX_PRIVATE_KEY ?? "", "base64"),
    { algorithm: "RS256" }
  );
  return { spaceJWT: JWT };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const {
    body: { playbackId },
    method,
  } = req;
  if (method === "POST" && playbackId) {
    const JWT = signJWT(playbackId as string);

    await axios
      .get(`https://stats.mux.com/counts?token=${JWT.spaceJWT}`)
      .then((count) => {
        res.status(StatusCodes.OK).json(count?.data);
      })
      .catch((err) => {
        res.status(StatusCodes.BAD_REQUEST).json(err);
      });
  } else {
    res.status(StatusCodes.METHOD_NOT_ALLOWED);
  }
}
