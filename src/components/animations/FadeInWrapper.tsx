"use client";
import { motion } from "framer-motion";

const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FadeInWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInVariant}
    >
      {children}
    </motion.div>
  );
};

export default FadeInWrapper;
