import createHashtagPlugin from "@draft-js-plugins/hashtag";
import createEmojiPlugin from "@draft-js-plugins/emoji";
import createLinkifyPlugin from "@draft-js-plugins/linkify";

import "@draft-js-plugins/emoji/lib/plugin.css";

import { TextBlueStyles } from "./TextArea.styles";

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

const emojiPlugin = createEmojiPlugin({
  useNativeArt: true,
});

const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

const plugins = [hashtagPlugin, emojiPlugin, linkifyPlugin];

export { plugins, EmojiSuggestions, EmojiSelect };
