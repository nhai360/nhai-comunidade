import createHashtagPlugin from "@draft-js-plugins/hashtag";
import createEmojiPlugin, { defaultTheme } from "@draft-js-plugins/emoji";
import createLinkifyPlugin from "@draft-js-plugins/linkify";

import "@draft-js-plugins/emoji/lib/plugin.css";

import {
  EmojiSelectButtonStyles,
  EmojiSelectPopoverEntryStyles,
  EmojiSelectPopoverGroupsStyles,
  EmojiSelectPopoverNavEntryActiveStyles,
  EmojiSelectPopoverNavEntryStyles,
  EmojiSelectPopoverNavStyles,
  EmojiSelectPopoverOnBottomStyles,
  EmojiSelectPopoverOnTopStyles,
  EmojiStyles,
  EmojiSuggestionsEntryStyles,
  EmojiSuggestionsEntryFocusedStyles,
  TextBlueStyles,
} from "../TextArea.styles";
import { useMemo } from "react";
import { Button } from "@/ui/Button";
import { SmileysIcon } from "@/ui/_icons";

const linkifyPlugin = createLinkifyPlugin({
  theme: {
    link: TextBlueStyles,
  },
});

const hashtagPlugin = createHashtagPlugin({
  theme: {
    hashtag: TextBlueStyles,
  },
});

const emojiPluginWithoutCustom = createEmojiPlugin({
  useNativeArt: true,
});

type Props = {
  emojiSelectPosition: "top" | "bottom";
};

export function usePlugins({ emojiSelectPosition }: Props) {
  return useMemo(() => {
    const emojiSelectPopover =
      emojiSelectPosition === "top"
        ? EmojiSelectPopoverOnTopStyles
        : EmojiSelectPopoverOnBottomStyles;

    const emojiPlugin = createEmojiPlugin({
      useNativeArt: true,
      theme: {
        ...defaultTheme,
        emojiSuggestionsEntry: EmojiSuggestionsEntryStyles,
        emojiSuggestionsEntryFocused: EmojiSuggestionsEntryFocusedStyles,
        emojiSelect: EmojiStyles,
        emojiSelectButton: EmojiSelectButtonStyles,
        emojiSelectButtonPressed: EmojiSelectButtonStyles,
        emojiSelectPopover,
        emojiSelectPopoverGroups: EmojiSelectPopoverGroupsStyles,
        emojiSelectPopoverEntry: EmojiSelectPopoverEntryStyles,
        emojiSelectPopoverEntryFocused: EmojiSelectPopoverEntryStyles,
        emojiSelectPopoverNav: EmojiSelectPopoverNavStyles,
        emojiSelectPopoverNavItem: EmojiSelectPopoverNavEntryStyles,
        emojiSelectPopoverNavEntry: EmojiSelectPopoverNavEntryStyles,
        emojiSelectPopoverNavEntryActive:
          EmojiSelectPopoverNavEntryActiveStyles,
      },
      selectButtonContent: (
        <Button type="button" icon ghost variant="transparent">
          <SmileysIcon />
        </Button>
      ),
    });

    const { EmojiSelect, EmojiSuggestions } = emojiPlugin;

    return {
      plugins: [emojiPlugin, hashtagPlugin, linkifyPlugin],
      EmojiSelect,
      EmojiSuggestions,
    };
  }, [emojiSelectPosition]);
}

export const defaultPlugins = [
  hashtagPlugin,
  linkifyPlugin,
  emojiPluginWithoutCustom,
];
