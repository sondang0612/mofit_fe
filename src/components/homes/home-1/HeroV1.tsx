"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import useWindowSize from "@/hooks/useWindowSize";

const HeroV1 = () => {
  const [translateX, setTranslateX] = React.useState(0);
  const textRef = React.useRef<HTMLDivElement | null>(null);
  const { screenWidth } = useWindowSize();
  React.useLayoutEffect(() => {
    if (textRef?.current?.offsetWidth && window?.innerWidth) {
      setTranslateX(-(textRef.current?.offsetWidth + screenWidth) || 0);
    }
  }, [textRef.current?.offsetWidth, screenWidth]);

  return (
    <div className="w-full h-full relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <Image
          src="/assets/images/hero.png"
          loading="eager"
          alt="Hero Image"
          width={0}
          height={600}
          sizes="100vw"
          className="w-full h-full"
        />
      </motion.div>
      <motion.div
        animate={{
          x: [0, translateX],
        }}
        transition={{
          duration: 10,
          ease: "linear",
          repeat: Infinity,
        }}
        className="moving-text"
        ref={textRef}
      >
        THỂ THAO TỰ DO NIỀM VUI CỘNG ĐỒNG
      </motion.div>
    </div>
  );
};

export default HeroV1;
