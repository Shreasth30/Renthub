"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const isTouchDevice = useRef(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spotlight follows with a slightly different spring for a "liquid" feel
  const lightX = useSpring(cursorX, { damping: 45, stiffness: 120, mass: 1.2 });
  const lightY = useSpring(cursorY, { damping: 45, stiffness: 120, mass: 1.2 });

  useEffect(() => {
    // Detect touch devices
    isTouchDevice.current = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice.current) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  // Don't render on touch devices or during SSR
  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
    return null;
  }

  return (
    <>
      {/* Background Spotlight Overlay - High Z-index with blending */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: lightX,
          y: lightY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "plus-lighter",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div 
          className="w-[1200px] h-[1200px] rounded-full"
          style={{
            background: "radial-gradient(circle at center, rgba(99, 102, 241, 0.12) 0%, rgba(201, 168, 76, 0.06) 25%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
      </motion.div>
    </>
  );
}
