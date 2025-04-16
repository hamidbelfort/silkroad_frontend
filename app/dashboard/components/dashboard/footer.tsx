"use client";
import React, { useState, useEffect } from "react";

const Footer = () => {
  const [year, setYear] = useState(
    new Date().getFullYear()
  );
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return (
    <footer className="w-full text-center text-xs py-2 text-muted-foreground border-t">
      © {year}{" "}
      <h2 className="font-bold hover:underline">
        SilkRoad
      </h2>
      . All rights reserved.
    </footer>
  );
};

export default Footer;
