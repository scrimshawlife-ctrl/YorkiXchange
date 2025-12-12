import { cn } from "@/lib/utils";

type BrandLogoProps = {
  variant?: "badge" | "wordmark" | "mark";
  size?: number;
  className?: string;
  title?: string;
};

export function BrandLogo({
  variant = "wordmark",
  size = 32,
  className,
  title,
}: BrandLogoProps) {
  const getSvgPath = () => {
    switch (variant) {
      case "badge":
        return "/assets/brand/yorkiexchange-badge.svg";
      case "mark":
        return "/assets/brand/yorkiexchange-mark.svg";
      case "wordmark":
      default:
        return "/assets/brand/yorkiexchange-wordmark.svg";
    }
  };

  const getAspectRatio = () => {
    switch (variant) {
      case "badge":
      case "mark":
        return "1/1";
      case "wordmark":
      default:
        return "4/1";
    }
  };

  const getDefaultTitle = () => {
    switch (variant) {
      case "badge":
        return "YorkiExchange Marketplace Badge";
      case "mark":
        return "YorkiExchange Mark";
      case "wordmark":
      default:
        return "YorkiExchange Marketplace";
    }
  };

  return (
    <img
      src={getSvgPath()}
      alt={title || getDefaultTitle()}
      className={cn("inline-block", className)}
      style={{
        height: size,
        width: variant === "wordmark" ? "auto" : size,
        aspectRatio: getAspectRatio(),
      }}
      aria-label={title || getDefaultTitle()}
    />
  );
}
