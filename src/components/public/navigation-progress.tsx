"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type RouteLoadingContextValue = {
  currentRoute: string;
  startLoading: (href: string) => void;
  finishLoading: (route?: string) => void;
};

const RouteLoadingContext = createContext<RouteLoadingContextValue | null>(null);

export function RouteLoadingProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentRoute = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if ((pendingRoute === null || pendingRoute === currentRoute) && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [currentRoute, pendingRoute]);

  const value = useMemo<RouteLoadingContextValue>(
    () => ({
      currentRoute,
      startLoading: (href: string) => {
        const nextUrl = new URL(href);
        const nextRoute = `${nextUrl.pathname}${nextUrl.search}`;

        if (nextRoute === currentRoute) {
          return;
        }

        setPendingRoute(nextRoute);

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          setPendingRoute(null);
        }, 8000);
      },
      finishLoading: (route) => {
        if (route && route !== currentRoute) {
          return;
        }

        setPendingRoute(null);
        setIsInitialLoad(false);

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      },
    }),
    [currentRoute],
  );

  const isActive = isInitialLoad || (pendingRoute !== null && pendingRoute !== currentRoute);

  return (
    <RouteLoadingContext.Provider value={value}>
      {children}
      <NavigationProgress active={isActive} />
    </RouteLoadingContext.Provider>
  );
}

export function useRouteLoading() {
  const context = useContext(RouteLoadingContext);

  if (!context) {
    throw new Error("useRouteLoading must be used within RouteLoadingProvider");
  }

  return context;
}

export function RouteReady() {
  const { currentRoute, finishLoading } = useRouteLoading();

  useEffect(() => {
    finishLoading(currentRoute);
  }, [currentRoute, finishLoading]);

  return null;
}

function NavigationProgress({ active }: { active: boolean }) {
  return (
    <div
      aria-hidden={!active}
      className={`pointer-events-none fixed inset-0 z-[70] transition duration-200 ${
        active ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-[rgba(247,243,236,0.84)] backdrop-blur-md" />
      <div className="absolute inset-x-0 top-0 h-1 overflow-hidden bg-[rgba(234,217,167,0.45)]">
        <div className="site-route-loading-bar h-full w-1/3 rounded-full bg-[linear-gradient(90deg,var(--accent-teal),var(--accent-gold),var(--accent-orange))]" />
      </div>
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="site-panel-social flex items-center gap-4 rounded-full px-5 py-3 shadow-[0_18px_40px_rgba(23,25,34,0.1)]">
          <span className="site-route-loading-spinner h-9 w-9 rounded-full border-2 border-[rgba(99,184,176,0.2)] border-t-[var(--accent-teal)] border-r-[var(--accent-gold)]" />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-[var(--text-primary)]">Loading</p>
            <p className="site-label text-xs uppercase tracking-[0.18em]">Preparing next page</p>
          </div>
        </div>
      </div>
    </div>
  );
}
