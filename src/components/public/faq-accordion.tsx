"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { trackEvent } from "@/lib/analytics";
import { getLocalizedText } from "@/lib/i18n";
import type { FaqDoc, Locale } from "@/types/content";

export function FaqAccordion({ locale, faqs }: { locale: Locale; faqs: FaqDoc[] }) {
  return (
    <Accordion type="single" collapsible defaultValue={faqs[0]?.id} className="space-y-3">
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id}>
          <AccordionTrigger
            className="items-start gap-4 md:items-center [&>svg]:mt-1 md:[&>svg]:mt-0"
            onClick={() => {
              trackEvent("faq_open", { faqId: faq.id });
            }}
          >
            <div className="grid min-w-0 flex-1 grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_120px] md:items-center md:gap-4">
              <span className="min-w-0 text-base leading-7 font-semibold text-[var(--text-primary)]">
                {getLocalizedText(faq.question, locale)}
              </span>
              <div className="md:w-[120px]">
                <Badge variant="outline" className="site-badge-soft justify-start">
                  {faq.category}
                </Badge>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <p className="site-muted text-sm leading-7">
              {getLocalizedText(faq.answer, locale)}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
