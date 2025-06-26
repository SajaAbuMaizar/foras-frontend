import Image from "next/image";
import React from "react";

interface Props {
  src: string;
}

const JobImage: React.FC<Props> = ({ src }) => (
  <div className="md:w-1/4 w-full flex justify-center mb-6 md:mb-0">
    <div className="relative w-full h-64 md:h-auto md:min-h-[300px] rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-gray-100 flex items-center justify-center">
      <Image
        src={src}
        alt="Job Image"
        fill
        className="object-contain p-2"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
      />
    </div>
  </div>
);

export default JobImage;