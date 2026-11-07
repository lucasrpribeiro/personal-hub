import { cn } from "@/lib/utils";

interface ProgressiveBlurProps {
  direction?: "top" | "bottom" | "both";
  className?: string;
  intensity?: "sm" | "md" | "lg";
}

export function ProgressiveBlur({
  direction = "bottom",
  className,
  intensity = "md",
}: ProgressiveBlurProps) {
  const blurAmount = {
    sm: "backdrop-blur-[4px]",
    md: "backdrop-blur-[8px]",
    lg: "backdrop-blur-[16px]",
  }[intensity];

  return (
    <>
      {(direction === "top" || direction === "both") && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none fixed top-0 left-0 right-0 z-40 h-16 w-full select-none",
            blurAmount,
            "[mask-image:linear-gradient(to_bottom,black_20%,transparent_100%)]",
            className
          )}
        />
      )}

      {(direction === "bottom" || direction === "both") && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none fixed bottom-0 left-0 right-0 z-40 h-20 w-full select-none",
            blurAmount,
            "[mask-image:linear-gradient(to_top,black_20%,transparent_100%)]",
            className
          )}
        />
      )}
    </>
  );
}
