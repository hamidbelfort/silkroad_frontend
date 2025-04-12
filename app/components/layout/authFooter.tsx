"use client";

import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
const AuthFooter = () => {
  const [year, setYear] = useState(
    new Date().getFullYear()
  );

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return (
    <footer className="w-full bg-gradient-to-t from-background to-muted/50 text-center py-4 text-sm text-muted-foreground mt-auto">
      <p>
        <HoverCard>
          <HoverCardTrigger>
            <Button
              variant="link"
              className="hover:no-underline cursor-pointer"
            >
              &copy; {year} Silkroad
            </Button>
            All rights reserved.
          </HoverCardTrigger>
          <HoverCardContent>
            Made with ❤️ by{" "}
            <Link href="https://github.com/hamidbelfort">
              Hamid
            </Link>
          </HoverCardContent>
        </HoverCard>
      </p>
    </footer>
  );
};

export default AuthFooter;
