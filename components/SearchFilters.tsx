"use client";

import { useMemo } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";

const CATS = [
  "all",
  "yorkies_for_sale",
  "rehoming",
  "stud_service",
  "grooming",
  "accessories",
  "food_health",
  "rescue_adoption",
  "other",
] as const;

export type Filters = {
  q: string;
  category: typeof CATS[number];
  maxPrice: string; // dollars string
};

export default function SearchFilters({
  value,
  onChange,
}: {
  value: Filters;
  onChange: (v: Filters) => void;
}) {
  const label = useMemo(() => (value.category === "all" ? "All categories" : value.category.replaceAll("_", " ")), [value.category]);

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-1">
          <div className="text-sm font-medium">Search</div>
          <Input value={value.q} onChange={(e) => onChange({ ...value, q: e.target.value })} placeholder="Yorkie, harness, grooming, rehome..." />
        </div>

        <div className="space-y-1">
          <div className="text-sm font-medium">Category</div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-56 justify-between">
                {label}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {CATS.map((c) => (
                <DropdownMenuItem key={c} onClick={() => onChange({ ...value, category: c })}>
                  {c === "all" ? "All categories" : c.replaceAll("_", " ")}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-sm font-medium cursor-help">Max price</div>
            </TooltipTrigger>
            <TooltipContent>Leave blank to ignore price filtering.</TooltipContent>
          </Tooltip>
          <Input
            value={value.maxPrice}
            onChange={(e) => onChange({ ...value, maxPrice: e.target.value })}
            placeholder="e.g. 500"
            inputMode="numeric"
          />
        </div>
      </div>
    </TooltipProvider>
  );
}
