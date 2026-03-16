export function buildEventJsonLd(input: {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: input.name,
    description: input.description,
    startDate: input.startDate,
    endDate: input.endDate,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    image: [input.image],
  };
}
