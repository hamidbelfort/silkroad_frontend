import React from "react";
import { useState } from "react";
const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  return (
    <footer className="w-full text-center text-xs py-2 text-muted-foreground border-t">
      © {year} SilkRoad. All rights reserved.
    </footer>
  );
};

export default Footer;
