export type ParsedVideo =
  | {
      provider: "youtube";
      id: string;
      embedUrl: string;
      thumbnailUrl: string;
    }
  | {
      provider: "vimeo";
      id: string;
      embedUrl: string;
    }
  | {
      provider: "file";
      embedUrl: string;
    };

const VIDEO_FILE_PATTERN = /\.(mp4|webm|mov|m4v)(\?|$)/i;

export function parseVideoUrl(rawUrl: string): ParsedVideo | null {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  try {
    const url = new URL(trimmed);

    if (VIDEO_FILE_PATTERN.test(url.pathname)) {
      return { provider: "file", embedUrl: trimmed };
    }

    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = url.pathname.slice(1).split("/")[0];
      if (!id) return null;
      return youtubeParsed(id);
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      const id =
        url.searchParams.get("v") ??
        url.pathname.match(/^\/embed\/([^/]+)/)?.[1] ??
        url.pathname.match(/^\/shorts\/([^/]+)/)?.[1];
      if (!id) return null;
      return youtubeParsed(id);
    }

    if (host === "vimeo.com" || host === "player.vimeo.com") {
      const id =
        url.pathname.match(/\/(\d+)/)?.[1] ??
        url.pathname.match(/\/video\/(\d+)/)?.[1];
      if (!id) return null;
      return {
        provider: "vimeo",
        id,
        embedUrl: `https://player.vimeo.com/video/${id}?dnt=1`,
      };
    }

    return null;
  } catch {
    return null;
  }
}

function youtubeParsed(id: string): ParsedVideo {
  return {
    provider: "youtube",
    id,
    embedUrl: `https://www.youtube-nocookie.com/embed/${id}?rel=0`,
    thumbnailUrl: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
  };
}
