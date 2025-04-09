import React from "react";

const SkeletonAddress = () => {
  return (
    <div className="skeleton-address">
      <div className="skeleton-line short"></div>
      <div className="skeleton-line icon-line">
        <div className="icon"></div>
        <div className="line"></div>
      </div>
      <div className="skeleton-line icon-line">
        <div className="icon"></div>
        <div className="line"></div>
      </div>
      <div className="skeleton-line icon-line">
        <div className="icon"></div>
        <div className="line long"></div>
      </div>
    </div>
  );
};

export default SkeletonAddress;
