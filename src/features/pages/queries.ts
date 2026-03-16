export async function getPageList() {
  const { pages } = await import("@/lib/content/repository").then((mod) => mod.getPublicSnapshot());
  return pages;
}
