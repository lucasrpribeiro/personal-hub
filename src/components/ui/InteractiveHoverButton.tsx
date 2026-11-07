"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  href?: string;
  className?: string;
  variant?: "cyan" | "white" | "emerald";
}

export function InteractiveHoverButton({
  text,
  href,
  className,
  variant = "cyan",
  ...props
}: InteractiveHoverButtonProps) {
  const variantStyles = {
    cyan: {
      border: "border-zinc-800 hover:border-cyan-500/50",
      dot: "bg-cyan-400",
      fill: "bg-cyan-500",
      textHover: "group-hover:text-zinc-950",
    },
    white: {
      border: "border-zinc-800 hover:border-zinc-600",
      dot: "bg-zinc-100",
      fill: "bg-zinc-100",
      textHover: "group-hover:text-zinc-950",
    },
    emerald: {
      border: "border-zinc-800 hover:border-emerald-500/50",
      dot: "bg-emerald-400",
      fill: "bg-emerald-500",
      textHover: "group-hover:text-zinc-950",
    },
  }[variant];

  const content = (
    <>
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "h-2 w-2 rounded-full transition-all duration-300 group-hover:scale-[100]",
            variantStyles.dot,
            variantStyles.fill
          )}
        />
        <span
          className={cn(
            "inline-block font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0",
            "text-zinc-300"
          )}
        >
          {text}
        </span>
      </div>

      <div
        className={cn(
          "absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100",
          variantStyles.textHover
        )}
      >
        <span className="font-mono text-xs font-bold tracking-wider uppercase">
          {text}
        </span>
        <ArrowRight className="h-3.5 w-3.5" />
      </div>
    </>
  );

  const sharedClasses = cn(
    "group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded border bg-zinc-950/80 px-5 py-2.5 text-center font-mono transition-all duration-300",
    variantStyles.border,
    className
  );

  if (href) {
    return (
      <Link href={href} className={sharedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={sharedClasses} {...props}>
      {content}
    </button>
  );
}
