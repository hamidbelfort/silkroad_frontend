"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface DataStateProps {
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  imageSrc?: string;
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export const DataState = ({
  isLoading = false,
  isError = false,
  isEmpty = false,
  imageSrc = "/images/empty.svg",
  title,
  description,
  onRetry,
  retryLabel = "Try again",
}: DataStateProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center min-h-[300px] sm:min-h-[400px] p-6">
        <Skeleton className="w-48 h-48 rounded-xl" />
        <Skeleton className="w-40 h-4" />
        <Skeleton className="w-64 h-4" />
        <Skeleton className="w-28 h-10 rounded-md" />
      </div>
    );
  }

  if (isError || isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-6 min-h-[300px] sm:min-h-[400px]">
        <div className="relative w-60 h-60 sm:w-72 sm:h-72 mb-6">
          <Image
            src={imageSrc}
            alt="Empty or Error"
            fill
            className="object-contain"
          />
        </div>
        <h2 className="text-lg sm:text-2xl font-semibold mb-2">
          {title || (isError ? "Failed to load data" : "No data available")}
        </h2>
        <p className="text-muted-foreground mb-4 max-w-md text-sm sm:text-base">
          {description ||
            (isError
              ? "Something went wrong while fetching data."
              : "There is nothing to show here right now.")}
        </p>
        {onRetry && <Button onClick={onRetry}>{retryLabel}</Button>}
      </div>
    );
  }

  return null;
};
