"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
const Footer = () => {
  const [year, setYear] = useState(
    new Date().getFullYear()
  );
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  const app_title =
    process.env.APP_TITLE || "Silk Road Services";
  return (
    <footer className="w-full flex justify-center text-xs py-2 text-muted-foreground border-t">
      © {year}{" "}
      <h2 className="font-bold mx-1">
        <Link
          className="no-underline hover:underline cursor-pointer"
          href={"/"}
        >
          {app_title}
        </Link>
      </h2>
      . All rights reserved.
    </footer>
  );
};

export default Footer;
