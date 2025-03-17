"use client";
import FadeInWrapper from "@/components/animations/FadeInWrapper";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const TryNow = () => {
  const [showVideo, setShowVideo] = React.useState(false);

  return (
    <div className="w-full h-full relative overflow-hidden">
      <Image
        src="/assets/images/try-now.png"
        loading="eager"
        alt="Try Now"
        width={0}
        height={600}
        sizes="100vw"
        className="w-full h-full"
      />
      <span className="try-now__text">Bạn đã thử chưa</span>
      <button
        className="try-now__play-video px-3 py-1 rounded-10"
        onClick={() => setShowVideo(true)}
      >
        Xem video
      </button>

      {showVideo && (
        <div className="videoOverlay" onClick={() => setShowVideo(false)}>
          <div className="videoContainer">
            <button className="closeButton" onClick={() => setShowVideo(false)}>
              ✕
            </button>
            <iframe
              className="videoFrame"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default TryNow;
