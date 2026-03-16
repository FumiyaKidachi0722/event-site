"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils/cn";

type FilterOption = {
  label: string;
  value: string;
};

type Props = {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  options: FilterOption[];
  triggerClassName?: string;
  contentClassName?: string;
};

export function FilterSelect({
  value,
  onValueChange,
  placeholder,
  options,
  triggerClassName,
  contentClassName,
}: Props) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={cn(
          "h-12 rounded-full px-5 text-sm shadow-none",
          triggerClassName,
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        className={cn(
          "rounded-[1.5rem]",
          contentClassName,
        )}
      >
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="rounded-2xl px-4 py-3 data-[state=checked]:bg-[rgba(226,184,87,0.08)] data-[state=checked]:text-[var(--text-primary)]"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
