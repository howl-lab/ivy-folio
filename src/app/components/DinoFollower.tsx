"use client";

import { useEffect, useRef, useState } from "react";

function DinoSprite({
  walking,
  facingLeft,
}: {
  walking: boolean;
  facingLeft: boolean;
}) {
  return (
    <svg
      width="56"
      height="40"
      viewBox="0 0 12 10"
      style={{
        imageRendering: "pixelated",
        transform: facingLeft ? "scaleX(-1)" : "scaleX(1)",
        display: "block",
      }}
    >
      {/* tail */}
      <rect x="0" y="5" width="1" height="1" fill="#0015FF" />
      <rect x="1" y="4" width="1" height="1" fill="#0015FF" />
      {/* body */}
      <rect x="2" y="3" width="7" height="3" fill="#0015FF" />
      {/* upper body slope */}
      <rect x="4" y="2" width="4" height="1" fill="#0015FF" />
      {/* neck */}
      <rect x="7" y="1" width="2" height="2" fill="#0015FF" />
      {/* head */}
      <rect x="8" y="0" width="1" height="2" fill="#0015FF" />
      {/* snout */}
      <rect x="9" y="1" width="2" height="1" fill="#0015FF" />

      {/* legs */}
      <rect
        x="4"
        y="6"
        width="1"
        height="1"
        fill="#0015FF"
        style={
          walking ? { animation: "legA 0.28s steps(1) infinite" } : undefined
        }
      />
      <rect
        x="6"
        y="6"
        width="1"
        height="1"
        fill="#0015FF"
        style={
          walking ? { animation: "legB 0.28s steps(1) infinite" } : undefined
        }
      />
    </svg>
  );
}

export default function DinoFollower({ active = true }: { active?: boolean }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [walking, setWalking] = useState(false);
  const [facingLeft, setFacingLeft] = useState(false);

  const target = useRef({ x: -200, y: -200 });
  const current = useRef({ x: -200, y: -200 });
  const lastMouseX = useRef(-200);
  const walkTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const raf = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!active) {
      cancelAnimationFrame(raf.current!);
      // move off-screen when inactive
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = "translate(-200px, -200px)";
      }
      return;
    }

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (e.clientX < lastMouseX.current) setFacingLeft(true);
      else if (e.clientX > lastMouseX.current) setFacingLeft(false);
      lastMouseX.current = e.clientX;
      setWalking(true);
      clearTimeout(walkTimer.current);
      walkTimer.current = setTimeout(() => setWalking(false), 120);
    };

    const tick = () => {
      const t = target.current;
      const c = current.current;
      const nx = c.x + (t.x - c.x) * 0.12;
      const ny = c.y + (t.y - c.y) * 0.12;
      current.current = { x: nx, y: ny };
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translate(${nx - 28}px, ${ny - 20}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current!);
      clearTimeout(walkTimer.current);
    };
  }, [active]);

  return (
    <>
      <style>{`
        @keyframes legA { 0% { transform: translateY(0px); } 50% { transform: translateY(2px); } }
        @keyframes legB { 0% { transform: translateY(2px); } 50% { transform: translateY(0px); } }
      `}</style>
      <div
        ref={wrapperRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9998,
        }}
      >
        <DinoSprite walking={walking} facingLeft={facingLeft} />
      </div>
    </>
  );
}
