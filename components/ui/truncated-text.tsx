"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";
import { truncateText } from "@/lib/utils/stringHelpers";

interface TruncatedTextProps {
  text: string;
  maxLength?: number;
  className?: string;
  tooltipClassName?: string;
}

export const TruncatedText = ({
  text,
  maxLength = 20,
  className = "",
  tooltipClassName = "",
}: TruncatedTextProps) => {
  if (!text)
    return (
      <span className="text-muted-foreground">---</span>
    );

  const shouldTruncate = text.length > maxLength;
  const displayText = shouldTruncate
    ? truncateText(text, maxLength)
    : text;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={`truncate block cursor-default ${className}`}
          >
            {displayText}
          </span>
        </TooltipTrigger>
        {shouldTruncate && (
          <TooltipContent className={tooltipClassName}>
            <span>{text}</span>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};
