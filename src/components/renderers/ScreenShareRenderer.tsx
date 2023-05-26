
"use client";

import React, { useEffect, useRef } from "react";

interface Props {
  attach?: (element: HTMLVideoElement) => void | null;
}

export default function ScreenShareRenderer({ attach }: Props): JSX.Element {
  const videoEl = useRef<HTMLVideoElement | null>(null);
  

  useEffect(() => {
    const el = videoEl.current;
    if (!el) return;

    //Descomentar isso quando arrumar a função attach
    // attach(el);
  }, [attach]);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        maxHeight: "100%",
        maxWidth: "100%",
        position: "relative",
      }}
    >
      <video
        style={{ height: "100%", margin: "0px auto" }}
        ref={videoEl}
        autoPlay
        playsInline
      />
    </div>
  );
}
