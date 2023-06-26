export function getProfileUrl(nickname?: string) {
  if (!nickname) return "";
  if (nickname === process.env.NEXT_PUBLIC_NEGOCIOS_DE_ORGULHO)
    return "/negocios-de-orgulho";

  return `/profile/${nickname}`;
}
