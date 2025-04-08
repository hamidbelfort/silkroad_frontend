import React from "react";
import Image from "next/image";
const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Image
        height={200}
        width={200}
        src="/loading.svg"
        alt="loading"
      />
    </div>
  );
};

export default Loading;
