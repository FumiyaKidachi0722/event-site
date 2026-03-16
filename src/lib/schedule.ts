import type { SessionDoc } from "@/types/content";

export function findOverlappingSessions(sessions: SessionDoc[], target: SessionDoc) {
  const start = new Date(target.startAt).getTime();
  const end = new Date(target.endAt).getTime();

  return sessions.filter((session) => {
    if (
      session.id === target.id ||
      session.dayKey !== target.dayKey ||
      session.stageId !== target.stageId
    ) {
      return false;
    }

    const otherStart = new Date(session.startAt).getTime();
    const otherEnd = new Date(session.endAt).getTime();

    return start < otherEnd && end > otherStart;
  });
}
