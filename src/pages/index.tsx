import { Feed } from "@/features/feed";
import { FeedProvider } from "@/contexts";

import { withAuth } from "../middlewares";
import { useEffect, useState } from "react";
import {
  handleCreateChatMessage,
  handleGetChat,
} from "@/services/firebase/chat";

function FeedPage() {
  // const [chat, setChat] = useState([]);

  // useEffect(() => {
  //   handleGetChat("clixpk1yy0002yidw18kdnquq", setChat);
  // }, []);

  // useEffect(() => {
  //   console.log(chat);
  // }, [chat]);

  // const handleComment = async () => {
  //   await handleCreateChatMessage("clixpk1yy0002yidw18kdnquq", {
  //     message: "",
  //     userId: "clif0t8qr000syi5g7ea7dlni",
  //     userName: "Hermando Thiago",
  //   });
  // };

  return (
    <FeedProvider>
      {/* <button onClick={handleComment}>Botão</button> */}
      <Feed.DesktopLayout />
      <Feed.AppLayout />
    </FeedProvider>
  );
}

export default withAuth(FeedPage);
