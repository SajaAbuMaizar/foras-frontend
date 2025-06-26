import React from "react";

interface DetailItemProps {
  label: string;
  value: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => (
  <div className="flex items-start">
    <span className="font-medium w-40">{label}:</span>
    <span>{value}</span>
  </div>
);

export default DetailItem;
