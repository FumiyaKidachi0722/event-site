export async function getNewsList() {
  const { news } = await import("@/lib/content/repository").then((mod) => mod.getPublicSnapshot());
  return news;
}
