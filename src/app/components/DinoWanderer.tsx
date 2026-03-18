"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ─── Same sprite as DinoFollower ──────────────────────────────────────────────
function DinoSprite({
  walking,
  facingLeft,
  frame,
}: {
  walking: boolean;
  facingLeft: boolean;
  frame: number;
}) {
  const legAY = walking ? (frame % 2 === 0 ? 0 : 2) : 0;
  const legBY = walking ? (frame % 2 === 0 ? 2 : 0) : 0;

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
      <rect x="4" y={6 + legAY} width="1" height="1" fill="#0015FF" />
      <rect x="6" y={6 + legBY} width="1" height="1" fill="#0015FF" />
    </svg>
  );
}

// ─── Pixel drop ─────────────────────────────────────────────────────────────
interface Pixel {
  id: number;
  x: number;
  y: number;
}

const SPEED = 130; // px/s
const EAT_DIST = 24;
const IDLE_MIN = 800;
const IDLE_MAX = 2000;

export default function DinoWanderer({ active }: { active: boolean }) {
  const posRef = useRef({ x: 200, y: 200 });
  const targetRef = useRef({ x: 200, y: 200 });
  const idleUntilRef = useRef(0);
  const rafRef = useRef<number | undefined>(undefined);
  const lastTRef = useRef<number | undefined>(undefined);
  const frameCountRef = useRef(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const pixelQueueRef = useRef<Pixel[]>([]);
  const nextIdRef = useRef(0);

  const [walking, setWalking] = useState(false);
  const [facingLeft, setFacingLeft] = useState(false);
  const [frame, setFrame] = useState(0);
  const [pixels, setPixels] = useState<Pixel[]>([]);

  // pick a random waypoint in the viewport
  const pickWaypoint = useCallback(() => {
    const margin = 80;
    return {
      x: margin + Math.random() * (window.innerWidth - margin * 2),
      y: margin + Math.random() * (window.innerHeight - margin * 2),
    };
  }, []);

  useEffect(() => {
    if (!active) {
      cancelAnimationFrame(rafRef.current!);
      setWalking(false);
      return;
    }

    // start near center
    posRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    targetRef.current = pickWaypoint();

    const tick = (t: number) => {
      if (!lastTRef.current) lastTRef.current = t;
      const dt = Math.min((t - lastTRef.current) / 1000, 0.05); // cap at 50ms
      lastTRef.current = t;

      const pos = posRef.current;
      const now = performance.now();

      // get next target: prefer pixel queue
      let tgt = targetRef.current;
      if (pixelQueueRef.current.length > 0) {
        const p = pixelQueueRef.current[0];
        tgt = { x: p.x, y: p.y };
      }

      if (now < idleUntilRef.current) {
        // idling
        setWalking(false);
      } else {
        const dx = tgt.x - pos.x;
        const dy = tgt.y - pos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < EAT_DIST) {
          if (pixelQueueRef.current.length > 0) {
            // eat pixel
            const eaten = pixelQueueRef.current[0];
            pixelQueueRef.current = pixelQueueRef.current.slice(1);
            setPixels((prev) => prev.filter((p) => p.id !== eaten.id));
          }
          // idle then pick new waypoint
          idleUntilRef.current =
            performance.now() +
            IDLE_MIN +
            Math.random() * (IDLE_MAX - IDLE_MIN);
          targetRef.current = pickWaypoint();
          setWalking(false);
        } else {
          const step = SPEED * dt;
          const nx = pos.x + (dx / dist) * step;
          const ny = pos.y + (dy / dist) * step;
          posRef.current = { x: nx, y: ny };
          setFacingLeft(dx < 0);
          setWalking(true);

          // animate walk frame every ~160ms
          frameCountRef.current += dt;
          if (frameCountRef.current > 0.16) {
            frameCountRef.current = 0;
            setFrame((f) => 1 - f);
          }
        }
      }

      if (wrapperRef.current) {
        const p = posRef.current;
        wrapperRef.current.style.transform = `translate(${p.x - 28}px, ${p.y - 20}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current!);
      lastTRef.current = undefined;
    };
  }, [active, pickWaypoint]);

  // click handler: drop a pixel
  useEffect(() => {
    if (!active) return;
    const onClickGlobal = (e: MouseEvent) => {
      const id = nextIdRef.current++;
      const px: Pixel = { id, x: e.clientX, y: e.clientY };
      pixelQueueRef.current = [...pixelQueueRef.current, px];
      setPixels((prev) => [...prev, px]);
    };
    window.addEventListener("click", onClickGlobal);
    return () => window.removeEventListener("click", onClickGlobal);
  }, [active]);

  if (!active) return null;

  return (
    <>
      {/* dropped pixels */}
      {pixels.map((p) => (
        <div
          key={p.id}
          style={{
            position: "fixed",
            left: p.x - 3,
            top: p.y - 3,
            width: 6,
            height: 6,
            background: "#ed4253",
            pointerEvents: "none",
            zIndex: 9990,
            imageRendering: "pixelated",
          }}
        />
      ))}

      {/* dino */}
      <div
        ref={wrapperRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9991,
          willChange: "transform",
        }}
      >
        <DinoSprite walking={walking} facingLeft={facingLeft} frame={frame} />
      </div>
    </>
  );
}
