import React from "react";

interface Props {
  currentItems?: number;
  totalItems?: number;
}

export default function Pagination1(props: Props) {
  const { currentItems = 1, totalItems = 1 } = props;
  const progress = totalItems > 0 ? (currentItems / totalItems) * 100 : 0;

  return (
    <div
      className="progress progress_uomo mb-3 ms-auto me-auto"
      style={{ width: "300px" }}
    >
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: `${progress}%` }}
        aria-valuenow={`${Math.round(progress)}%` as any}
        aria-valuemin={0}
        aria-valuemax={100}
      ></div>
    </div>
  );
}
