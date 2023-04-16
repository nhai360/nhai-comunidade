export function getProfileUrl(nickname?: string) {
  if (!nickname) return "";

  return `/profile/${nickname}`;
}
