import Image from "next/image";
import React from "react";

interface Props {
  src: string;
}

const JobImage: React.FC<Props> = ({ src }) => (
  <div className="md:w-1/4 w-full flex justify-center">
    <Image
      src={src}
      alt="Job Image"
      width={300}
      height={200}
      className="rounded shadow"
    />
  </div>
);

export default JobImage;