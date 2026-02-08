import React from "react";
import type { ReactNode } from "react";
import { motion, type Transition } from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -10,
  },
};

const pageTransition: Transition = {
  type: "tween",
  ease: [0.25, 1, 0.5, 1], 
  duration: 0.3,
};

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      {children}
    </motion.div>
  );
};
