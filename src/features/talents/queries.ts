export async function getTalentList() {
  const { talents } = await import("@/lib/content/repository").then((mod) =>
    mod.getPublicSnapshot(),
  );
  return talents;
}
