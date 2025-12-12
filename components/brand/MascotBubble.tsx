import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type MascotBubbleProps = {
  message?: string;
  size?: number;
  className?: string;
  showTooltip?: boolean;
};

export function MascotBubble({
  message,
  size = 48,
  className,
  showTooltip = true,
}: MascotBubbleProps) {
  const mascot = (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-yorkix-coral-light/20 p-2",
        className
      )}
      style={{ width: size + 16, height: size + 16 }}
    >
      <img
        src="/assets/brand/yorkixchange-mark.svg"
        alt="YorkiXchange Mascot"
        className="inline-block"
        style={{ width: size, height: size }}
        aria-hidden="true"
      />
    </div>
  );

  if (!showTooltip || !message) {
    return mascot;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{mascot}</TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs text-sm">{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
