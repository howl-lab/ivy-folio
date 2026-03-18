"use client";

import { useState, useEffect, useRef } from "react";
import TextCycler from "./components/TextCycler";
import DinoWanderer from "./components/DinoWanderer";
import DinoFollower from "./components/DinoFollower";
import ProjectTabs from "./components/ProjectTabs";

const PT_SANS = '"PT Sans", sans-serif';

// ─── Pine tree SVG ─────────────────────────────────────────────────────────────
function PineTree({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#0015FF"
      style={{ display: "inline-block" }}
    >
      <polygon points="12,2 20,18 4,18" />
      <rect x="10" y="18" width="4" height="4" />
    </svg>
  );
}

// ─── Tree layout — scattered across full 100vh ─────────────────────────────────
const TREES = [
  { left: "2%", top: "8%" },
  { left: "10%", top: "14%" },
  { left: "18%", top: "6%" },
  { left: "5%", top: "40%" },
  { left: "14%", top: "55%" },
  { left: "3%", top: "72%" },
  { left: "22%", top: "78%" },
  { left: "38%", top: "82%" },
  { left: "50%", top: "10%" },
  { left: "62%", top: "5%" },
  { left: "72%", top: "18%" },
  { left: "80%", top: "8%" },
  { right: "4%", top: "12%" },
  { right: "12%", top: "6%" },
  { right: "20%", top: "22%" },
  { right: "6%", top: "44%" },
  { right: "16%", top: "60%" },
  { right: "3%", top: "70%" },
  { right: "24%", top: "76%" },
];

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [dinoMode, setDinoMode] = useState<"wander" | "follow">("wander");
  const containerRef = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);

  // Switch dino mode based on which section is in view
  useEffect(() => {
    const el = section2Ref.current;
    const root = containerRef.current;
    if (!el || !root) return;
    const observer = new IntersectionObserver(
      ([entry]) => setDinoMode(entry.isIntersecting ? "follow" : "wander"),
      { root, threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        style={{
          height: "100vh",
          overflowY: "scroll",
          scrollSnapType: "y mandatory",
          scrollBehavior: "smooth",
        }}
      >
        {/* ── Section 1: Landing ── */}
        <section
          style={{
            position: "relative",
            height: "100vh",
            overflow: "hidden",
            background: "#ebebeb",
            scrollSnapAlign: "start",
            scrollSnapStop: "always",
          }}
        >
          {/* Scattered trees */}
          {TREES.map((pos, i) => (
            <span
              key={i}
              style={{ position: "absolute", ...pos, lineHeight: 0 }}
            >
              <PineTree size={28} />
            </span>
          ))}

          {/* Centered text */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              zIndex: 2,
            }}
          >
            <p
              style={{
                fontFamily: PT_SANS,
                fontWeight: 600,
                fontSize: "clamp(15px, 1.3vw, 18px)",
                color: "#111",
                marginBottom: 10,
              }}
            >
              hi, im ivy
            </p>
            <p
              style={{
                fontFamily: PT_SANS,
                fontSize: "clamp(14px, 1.2vw, 16px)",
                color: "#111",
                minHeight: "1.6em",
              }}
            >
              <TextCycler />
            </p>
          </div>

          {/* Scroll down cue */}
          <div
            style={{
              position: "absolute",
              bottom: 32,
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
              zIndex: 2,
              userSelect: "none",
            }}
          >
            <p
              style={{
                fontFamily: PT_SANS,
                fontSize: 13,
                color: "#0015FF",
                marginBottom: 6,
                letterSpacing: "0.04em",
              }}
            >
              scroll down
            </p>
            <span
              style={{
                display: "inline-block",
                color: "#0015FF",
                fontSize: 16,
                animation: "bounce 1.2s ease-in-out infinite",
              }}
            >
              ↓
            </span>
          </div>
        </section>

        {/* ── Section 2: Projects ── */}
        <section
          ref={section2Ref}
          style={{
            background: "#ebebeb",
            height: "100vh",
            overflow: "hidden",
            scrollSnapAlign: "start",
            scrollSnapStop: "always",
          }}
        >
          <ProjectTabs />
        </section>
      </div>

      {/* ── Dinos ── */}
      <DinoWanderer active={dinoMode === "wander"} />
      <DinoFollower active={dinoMode === "follow"} />
    </>
  );
}
