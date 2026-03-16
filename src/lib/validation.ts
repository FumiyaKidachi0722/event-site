import { fallbackSlug } from "@/lib/utils";
import type { EventDoc, FaqDoc, NewsDoc, PageDoc, SessionDoc, TalentDoc } from "@/types/content";

export function normalizeNews(input: NewsDoc) {
  return {
    ...input,
    slug: input.slug || fallbackSlug(input.title.en || input.title.ja),
    updatedAt: new Date().toISOString(),
  };
}

export function validateEvent(event: EventDoc) {
  const errors: string[] = [];
  if (!event.title.ja) errors.push("Event title (ja) is required.");
  if (!event.subtitle.ja) errors.push("Event subtitle (ja) is required.");
  if (!event.primaryCta.url) errors.push("Primary CTA URL is required.");
  if (!event.secondaryCta.url) errors.push("Secondary CTA URL is required.");
  if (!event.heroImageUrl) errors.push("Hero image URL is required.");
  return errors;
}

export function validateNews(news: NewsDoc) {
  const normalized = normalizeNews(news);
  const errors: string[] = [];
  if (!normalized.title.ja) errors.push("Title (ja) is required.");
  if (!normalized.summary.ja) errors.push("Summary (ja) is required.");
  if (!normalized.body.ja) errors.push("Body (ja) is required.");
  if (!normalized.slug) errors.push("Slug is required.");
  return { normalized, errors };
}

export function validateTalent(talent: TalentDoc) {
  const errors: string[] = [];
  if (!talent.name.ja) errors.push("Name (ja) is required.");
  if (!talent.slug) errors.push("Slug is required.");
  if (!talent.shortBio.ja) errors.push("Short bio (ja) is required.");
  if (!talent.fullBio.ja) errors.push("Full bio (ja) is required.");
  return errors;
}

export function validateSession(session: SessionDoc) {
  const errors: string[] = [];
  if (!session.title.ja) errors.push("Title (ja) is required.");
  if (!session.stageId) errors.push("Stage is required.");
  if (!session.startAt) errors.push("Start time is required.");
  if (!session.endAt) errors.push("End time is required.");
  if (new Date(session.endAt) <= new Date(session.startAt)) {
    errors.push("End time must be later than start time.");
  }
  return errors;
}

export function validateFaq(faq: FaqDoc) {
  const errors: string[] = [];
  if (!faq.question.ja) errors.push("Question (ja) is required.");
  if (!faq.answer.ja) errors.push("Answer (ja) is required.");
  return errors;
}

export function validatePage(page: PageDoc) {
  const errors: string[] = [];
  if (!page.title.ja) errors.push("Title (ja) is required.");
  if (!page.body.ja) errors.push("Body (ja) is required.");
  return errors;
}

export function translationCompletionScore(target: Record<string, string | undefined>) {
  const entries = Object.values(target);
  if (!entries.length) {
    return 0;
  }
  const filled = entries.filter((value) => value && value.trim().length > 0).length;
  return Math.round((filled / entries.length) * 100);
}
