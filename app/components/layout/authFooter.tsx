"use client";

import { FC } from "react";
import Image from "next/image";
const AuthFooter: FC = () => {
  return (
    <footer className="relative mt-10">
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <Image src={"/wave.svg"} alt="footer waves" width={100} height={20} />
      </div>
      <div className="relative bg-gray-100 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Silkroad. All rights reserved.
      </div>
    </footer>
  );
};

export default AuthFooter;
