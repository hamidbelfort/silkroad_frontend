"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import illustration from "@/public/images/not-found.svg";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center p-6">
      <Image
        src={illustration}
        alt="Page not found"
        width={400}
        height={300}
        className="mb-6 max-w-full h-auto"
      />
      <h1 className="text-2xl font-bold mb-2">
        Oops! Page not found
      </h1>
      <p className="text-muted-foreground mb-6">
        The page you are looking for does not exist or has
        been moved.
      </p>
      <Link href="/">
        <Button className="cursor-pointer">
          Go back to Home
        </Button>
      </Link>
    </div>
  );
}
