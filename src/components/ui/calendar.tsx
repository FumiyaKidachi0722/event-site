"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col gap-4",
        month: "space-y-4",
        caption: "relative flex items-center justify-center pt-1",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "h-7 w-7 rounded-full p-0",
        ),
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "site-label w-9 text-[0.8rem] font-normal",
        row: "mt-2 flex w-full",
        cell: "relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 rounded-full p-0 font-normal aria-selected:opacity-100",
        ),
        day_selected: "bg-[var(--accent-gold)] text-[#2f2615]",
        day_today: "border border-[rgba(228,196,122,0.24)]",
        day_outside: "text-[var(--text-label)] opacity-50",
        day_disabled: "text-[var(--text-label)] opacity-40",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, ...iconProps }) =>
          orientation === "left" ? (
            <ChevronLeft className="h-4 w-4" {...iconProps} />
          ) : (
            <ChevronRight className="h-4 w-4" {...iconProps} />
          ),
      }}
      {...props}
    />
  );
}

export { Calendar };
