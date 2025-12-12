import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MascotBubble } from "./MascotBubble";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  mascotMessage?: string;
  className?: string;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  mascotMessage,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-yorkix-gray/30 bg-yorkix-cream/10 p-8 text-center",
        className
      )}
    >
      <MascotBubble
        size={64}
        message={mascotMessage || title}
        showTooltip={!!mascotMessage}
      />

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-yorkix-charcoal">{title}</h3>
        <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      </div>

      {(actionLabel && actionHref) || onAction ? (
        actionHref ? (
          <Link href={actionHref}>
            <Button className="bg-yorkix-coral hover:bg-yorkix-coral/90">
              {actionLabel}
            </Button>
          </Link>
        ) : (
          <Button
            onClick={onAction}
            className="bg-yorkix-coral hover:bg-yorkix-coral/90"
          >
            {actionLabel}
          </Button>
        )
      ) : null}
    </div>
  );
}
