export async function getScheduleSnapshot() {
  const { sessions, stages } = await import("@/lib/content/repository").then((mod) =>
    mod.getPublicSnapshot(),
  );
  return { sessions, stages };
}
