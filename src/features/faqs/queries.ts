export async function getFaqList() {
  const { faqs } = await import("@/lib/content/repository").then((mod) => mod.getPublicSnapshot());
  return faqs;
}
