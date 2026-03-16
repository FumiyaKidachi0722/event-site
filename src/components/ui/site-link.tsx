"use client";

import Link, { type LinkProps } from "next/link";
import * as React from "react";

import { useRouteLoading } from "@/components/public/navigation-progress";

type SiteLinkProps = LinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    loading?: boolean;
  };

function isModifiedEvent(event: React.MouseEvent<HTMLAnchorElement>) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

const SiteLink = React.forwardRef<HTMLAnchorElement, SiteLinkProps>(
  ({ loading = true, onClick, target, download, ...props }, ref) => {
    const { startLoading } = useRouteLoading();

    return (
      <Link
        {...props}
        ref={ref}
        target={target}
        download={download}
        onClick={(event) => {
          onClick?.(event);

          if (
            !loading ||
            event.defaultPrevented ||
            event.button !== 0 ||
            isModifiedEvent(event) ||
            target === "_blank" ||
            download
          ) {
            return;
          }

          try {
            startLoading(event.currentTarget.href);
          } catch {
            // Ignore malformed href values and fall back to normal navigation.
          }
        }}
      />
    );
  },
);

SiteLink.displayName = "SiteLink";

export { SiteLink, type SiteLinkProps };
