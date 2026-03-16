"use client";

import type * as React from "react";

import { trackEvent, type AnalyticsEventName } from "@/lib/analytics";
import { SiteLink, type SiteLinkProps } from "@/components/ui/site-link";

import type { ReactNode } from "react";

type Props = SiteLinkProps & {
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  eventName?: AnalyticsEventName;
  eventParams?: Record<string, string | number | boolean | undefined>;
};

export function TrackableLink({
  children,
  eventName,
  eventParams,
  onClick,
  ...props
}: Props & { onClick?: React.MouseEventHandler<HTMLAnchorElement> }) {
  return (
    <SiteLink
      {...props}
      onClick={(event) => {
        if (eventName) {
          trackEvent(eventName, eventParams);
        }
        onClick?.(event);
      }}
    >
      {children}
    </SiteLink>
  );
}
