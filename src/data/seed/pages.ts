import seed from "../../../data/mock-db.seed.json";

const eventId = seed.currentEventId as keyof typeof seed.events;

export const seedPages = seed.events[eventId].pages;
