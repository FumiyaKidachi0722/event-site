"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils/cn";

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;

const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    side?: "top" | "right" | "bottom" | "left";
  }
>(({ className, children, side = "right", ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-[rgba(23,25,34,0.48)] backdrop-blur-sm" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 h-full w-full max-w-sm border-[rgba(234,217,167,0.18)] bg-[linear-gradient(180deg,rgba(35,39,54,0.98),rgba(23,25,34,0.98))] p-6 text-[rgba(255,250,242,0.94)] shadow-xl",
        side === "right" && "top-0 right-0 border-l",
        side === "left" && "top-0 left-0 border-r",
        side === "top" && "top-0 left-0 h-auto max-w-none border-b",
        side === "bottom" && "bottom-0 left-0 h-auto max-w-none border-t",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute top-4 right-4 rounded-full p-2 text-[rgba(255,250,242,0.7)] transition hover:bg-[rgba(255,255,255,0.08)] hover:text-white">
        <X className="h-4 w-4" />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
SheetContent.displayName = "SheetContent";

export { Sheet, SheetClose, SheetContent, SheetTrigger };
