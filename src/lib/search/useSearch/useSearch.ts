import { useFeedContext } from "@/contexts";
import { ChangeEvent, useRef } from "react";

export function useSearch() {
  const timerId = useRef(0);

  const { searchTerm, setSearchTerm, handleSearch } = useFeedContext();

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
    setSearchTerm(event.currentTarget.value);
    handleSearchAfterTyping();
  }

  return {
    searchTerm,
    handleChange,
    handleSearch,
  };
}
