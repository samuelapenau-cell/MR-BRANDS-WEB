import { NextResponse } from "next/server";

const POSTS = [
  { url: "https://www.instagram.com/p/DYYN-Oniilt/", shortcode: "DYYN-Oniilt" },
  { url: "https://www.instagram.com/p/DWNFNs9AJcw/", shortcode: "DWNFNs9AJcw" },
  { url: "https://www.instagram.com/p/DVt-Cy-Dyc5/", shortcode: "DVt-Cy-Dyc5" },
  { url: "https://www.instagram.com/reel/DY2v8yhNUn5/", shortcode: "DY2v8yhNUn5" },
  { url: "https://www.instagram.com/p/DVwWozbkcTE/", shortcode: "DVwWozbkcTE" },
  { url: "https://www.instagram.com/p/DSvQ3upES9P/", shortcode: "DSvQ3upES9P" },
  { url: "https://www.instagram.com/p/DSiG6_CDSVC/", shortcode: "DSiG6_CDSVC" },
  { url: "https://www.instagram.com/p/DSar-7sEvIz/", shortcode: "DSar-7sEvIz" },
];

const cache = new Map<string, { data: any; expiry: number }>();
const CACHE_TTL = 86_400_000;

async function fetchOgImage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 86400 },
    });
    const html = await res.text();
    const m = html.match(
      /<meta[^>]+property="og:image"[^>]+content="([^"]+)"/
    );
    const m2 = html.match(
      /<meta[^>]+content="([^"]+)"[^>]+property="og:image"/
    );
    const raw = (m && m[1]) || (m2 && m2[1]) || null;
    return raw ? raw.replace(/&amp;/g, "&") : null;
  } catch {
    return null;
  }
}

export async function GET() {
  const now = Date.now();
  const cached = cache.get("instagram-posts");
  if (cached && now < cached.expiry) {
    return NextResponse.json(cached.data, {
      headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=172800", "X-Cache": "HIT" },
    });
  }

  const posts = await Promise.all(
    POSTS.map(async (post) => {
      const image = await fetchOgImage(post.url);
      const proxied =
        image?.startsWith("http")
          ? `/api/instagram/image?url=${encodeURIComponent(image)}`
          : null;
      return {
        id: post.shortcode,
        shortcode: post.shortcode,
        url: `https://instagram.com/p/${post.shortcode}/`,
        image: proxied,
      };
    })
  );

  const data = { posts };
  cache.set("instagram-posts", { data, expiry: now + CACHE_TTL });

  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=172800" },
  });
}
