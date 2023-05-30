import { useFeedContext } from "@/contexts";
import { useArticleContext } from "@/contexts/ArticleContext";
import { useVideoContext } from "@/contexts/VideoContext";
import { useRouter } from "next/router";
import { ChangeEvent, useRef } from "react";

export function useSearch() {
  const timerId = useRef(0);
  const router = useRouter();

  const path = router?.pathname?.split("/")[1];

  const {
    searchTerm: searchTermPost,
    setSearchTerm: setSearchTermPost,
    handleSearch: handleSearchPost,
  } = useFeedContext();

  const {
    searchTerm: searchTermVideo,
    setSearchTerm: setSearchTermVideo,
    handleSearch: handleSearchVideo,
  } = useVideoContext();

  const {
    searchTerm: searchTermArticle,
    setSearchTerm: setSearchTermArticle,
    handleSearch: handleSearchArticle,
  } = useArticleContext();

  const searchTerm =
    path === "videos"
      ? searchTermVideo
      : path === "articles"
      ? searchTermArticle
      : searchTermPost;

  const handleSearch = () => {
    if (path === "") {
      handleSearchPost();
    } else if (path === "videos") {
      handleSearchVideo();
    } else if (path === "articles") {
      handleSearchArticle();
    }
  };

  function handleSearchAfterTyping() {
    if (timerId.current !== 0) {
      clearTimeout(timerId.current);
    }

    const timer = setTimeout(() => {
      handleSearch();
    }, 800);

    timerId.current = Number(timer);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (path === "") {
      setSearchTermPost(event.currentTarget.value);
    } else if (path === "videos") {
      setSearchTermVideo(event.currentTarget.value);
    } else if (path === "articles") {
      setSearchTermArticle(event.currentTarget.value);
    }
    handleSearchAfterTyping();
  }

  return {
    searchTerm,
    handleChange,
    handleSearch,
  };
}
