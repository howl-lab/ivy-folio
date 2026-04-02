"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>
      <div
        ref={cursorRef}
      style={{
        position: "fixed",
        top: -8,
        left: -8,
        width: 24,
        height: 24,
        borderRadius: "50%",
        background: "#0BDA51",
        pointerEvents: "none",
        zIndex: 9999,
        willChange: "transform",
        mixBlendMode: "difference",
      }}
    />
    </>
  );
}
