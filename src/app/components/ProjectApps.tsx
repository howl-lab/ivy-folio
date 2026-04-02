"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const PT_SANS = '"PT Sans", sans-serif';

// ── About modal ───────────────────────────────────────────────────────────────
function AboutModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9980,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          width: "min(480px, 90vw)",
          maxHeight: "70vh",
          overflowY: "auto",
          padding: "32px 36px",
          fontFamily: PT_SANS,
        }}
      >
        <p
          style={{
            fontSize: 15,
            color: "#111",
            lineHeight: 1.7,
            marginBottom: 24,
          }}
        >
          Hi I&apos;m ivy. This is the space where I play around with technology
          and design.
        </p>
        <p
          style={{
            fontSize: 15,
            color: "#111",
            lineHeight: 1.7,
            marginBottom: 48,
          }}
        >
          These are my artifacts.
        </p>
        <p style={{ fontSize: 15, color: "#111", marginBottom: 48 }}>
          ivychang02@gmail.com
        </p>
        <p style={{ fontSize: 15, color: "#111" }}>Copyrighted ©2026</p>
      </div>
    </div>
  );
}

const PLACEHOLDERS = [
  {
    title: "minesweeper",
    url: "https://v0-simple-minesweeper-game.vercel.app/",
    image: "images/minesweeper.jpg",
    tags: ["game"],
  },
  {
    title: "Phase FM",
    url: "https://v0-phase-fm.vercel.app/",
    image: "images/phaseFM.jpg",
    tags: ["tool"],
  },
  { title: "Project title", url: "", image: "", tags: ["game"] },
  { title: "Project title", url: "", image: "", tags: ["tool"] },
  // { title: "Project title", url: "", image: "", tags: [] },
  // { title: "Project title", url: "", image: "", tags: [] },
  // { title: "Project title", url: "", image: "", tags: [] },
  // { title: "Project title", url: "", image: "", tags: [] },
];

const ALL_TAGS = Array.from(new Set(PLACEHOLDERS.flatMap((p) => p.tags)));

// ── Pine tree ─────────────────────────────────────────────────────────────────
function PineTree({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#0BDA51"
      style={{ display: "inline-block" }}
    >
      <polygon points="12,2 20,18 4,18" />
      <rect x="10" y="18" width="4" height="4" />
    </svg>
  );
}

// Hardcoded grid-jitter positions (6 cols × 4 rows, one tree per cell)
const TREES = [
  { left: "4.2%", top: "6.8%" },
  { left: "21.3%", top: "14.2%" },
  { left: "38.9%", top: "8.5%" },
  { left: "55.4%", top: "18.1%" },
  { left: "71.7%", top: "11.3%" },
  { left: "89.6%", top: "16.7%" },
  { left: "7.1%", top: "32.4%" },
  { left: "19.8%", top: "43.1%" },
  { left: "36.2%", top: "38.7%" },
  { left: "58.3%", top: "29.6%" },
  { left: "69.4%", top: "44.8%" },
  { left: "91.2%", top: "35.9%" },
  { left: "3.8%", top: "57.3%" },
  { left: "22.6%", top: "68.9%" },
  { left: "41.5%", top: "62.4%" },
  { left: "54.9%", top: "71.8%" },
  { left: "74.3%", top: "55.6%" },
  { left: "88.7%", top: "64.2%" },
  { left: "9.4%", top: "83.7%" },
  { left: "18.1%", top: "92.5%" },
  { left: "39.7%", top: "87.3%" },
  { left: "57.6%", top: "79.4%" },
  { left: "76.8%", top: "94.1%" },
  { left: "93.5%", top: "86.2%" },
];

// ── Dino sprite ───────────────────────────────────────────────────────────────
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
      <rect x="0" y="5" width="1" height="1" fill="#000000" />
      <rect x="1" y="4" width="1" height="1" fill="#000000" />
      <rect x="2" y="3" width="7" height="3" fill="#000000" />
      <rect x="4" y="2" width="4" height="1" fill="#000000" />
      <rect x="7" y="1" width="2" height="2" fill="#000000" />
      <rect x="8" y="0" width="1" height="2" fill="#000000" />
      <rect x="9" y="1" width="2" height="1" fill="#000000" />
      <rect x="4" y={6 + legAY} width="1" height="1" fill="#000000" />
      <rect x="6" y={6 + legBY} width="1" height="1" fill="#000000" />
    </svg>
  );
}

// ── Canvas-scoped wanderer ────────────────────────────────────────────────────
const SPEED = 130;
const EAT_DIST = 24;
const IDLE_MIN = 800;
const IDLE_MAX = 2000;

interface Pixel {
  id: number;
  x: number;
  y: number;
}

function CanvasWanderer({
  active,
  containerRef,
}: {
  active: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  // null = not yet initialized, stays at last position on re-activation
  const posRef = useRef<{ x: number; y: number } | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
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

  const getBounds = useCallback(() => {
    const el = containerRef.current;
    return { w: el?.clientWidth ?? 600, h: el?.clientHeight ?? 400 };
  }, [containerRef]);

  const pickWaypoint = useCallback(() => {
    const { w, h } = getBounds();
    const margin = 60;
    return {
      x: margin + Math.random() * (w - margin * 2),
      y: margin + Math.random() * (h - margin * 2),
    };
  }, [getBounds]);

  // Animation loop
  useEffect(() => {
    if (!active) {
      cancelAnimationFrame(rafRef.current!);
      setWalking(false);
      return;
    }

    // Initialize position only on first mount, not on every re-activation
    if (!posRef.current) {
      const { w, h } = getBounds();
      posRef.current = { x: w / 2, y: h / 2 };
      targetRef.current = pickWaypoint();
    }

    lastTRef.current = undefined;

    const tick = (t: number) => {
      // Skip the first frame to avoid a large dt jump
      if (lastTRef.current === undefined) {
        lastTRef.current = t;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const dt = Math.min((t - lastTRef.current) / 1000, 0.033);
      lastTRef.current = t;

      const pos = posRef.current!;
      const now = performance.now();

      // Prefer pixel target over waypoint
      const tgt =
        pixelQueueRef.current.length > 0
          ? { x: pixelQueueRef.current[0].x, y: pixelQueueRef.current[0].y }
          : targetRef.current;

      if (now < idleUntilRef.current) {
        setWalking(false);
      } else {
        const dx = tgt.x - pos.x;
        const dy = tgt.y - pos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < EAT_DIST) {
          if (pixelQueueRef.current.length > 0) {
            const eaten = pixelQueueRef.current[0];
            pixelQueueRef.current = pixelQueueRef.current.slice(1);
            setPixels((prev) => prev.filter((p) => p.id !== eaten.id));
          }
          idleUntilRef.current =
            performance.now() +
            IDLE_MIN +
            Math.random() * (IDLE_MAX - IDLE_MIN);
          targetRef.current = pickWaypoint();
          setWalking(false);
        } else {
          const step = SPEED * dt;
          posRef.current = {
            x: pos.x + (dx / dist) * step,
            y: pos.y + (dy / dist) * step,
          };
          setFacingLeft(dx < 0);
          setWalking(true);
          frameCountRef.current += dt;
          if (frameCountRef.current > 0.16) {
            frameCountRef.current = 0;
            setFrame((f) => 1 - f);
          }
        }
      }

      if (wrapperRef.current && posRef.current) {
        const p = posRef.current;
        wrapperRef.current.style.transform = `translate(${p.x - 28}px, ${p.y - 20}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current!);
    };
  }, [active, pickWaypoint, getBounds]);

  // Click → drop pixel at canvas-local coordinates
  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    const onClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const id = nextIdRef.current++;
      const px: Pixel = {
        id,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      pixelQueueRef.current = [...pixelQueueRef.current, px];
      setPixels((prev) => [...prev, px]);
    };

    container.addEventListener("click", onClick);
    return () => container.removeEventListener("click", onClick);
  }, [active, containerRef]);

  return (
    <>
      {pixels.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: p.x - 3,
            top: p.y - 3,
            width: 6,
            height: 6,
            background: "#ed4253",
            pointerEvents: "none",
            zIndex: 3,
            imageRendering: "pixelated",
          }}
        />
      ))}
      <div
        ref={wrapperRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          willChange: "transform",
          zIndex: 2,
        }}
      >
        <DinoSprite walking={walking} facingLeft={facingLeft} frame={frame} />
      </div>
    </>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ProjectApps() {
  const [activeUrl, setActiveUrl] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [canvasHovered, setCanvasHovered] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [aboutHovered, setAboutHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const filtered = PLACEHOLDERS.filter(
    (p) => !activeTag || p.tags.includes(activeTag),
  );

  // ── Shared pieces ──────────────────────────────────────────────────────────

  const titleButton = (
    <button
      onClick={() => {
        setActiveUrl(null);
        setMenuOpen(false);
      }}
      style={{
        fontFamily: PT_SANS,
        fontSize: 26,
        fontWeight: 700,
        color: "#111",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        textAlign: "left",
        lineHeight: 1,
      }}
    >
      Playground
    </button>
  );

  const aboutButton = (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setAboutOpen((o) => !o)}
        onMouseEnter={() => setAboutHovered(true)}
        onMouseLeave={() => setAboutHovered(false)}
        style={{
          width: 12,
          height: 12,
          background: "#111",
          border: "none",
          cursor: "pointer",
          padding: 0,
          flexShrink: 0,
          display: "block",
        }}
      />
      {aboutHovered && (
        <span
          style={{
            position: "absolute",
            left: 18,
            top: "50%",
            transform: "translateY(-50%)",
            fontFamily: PT_SANS,
            fontSize: 12,
            color: "#111",
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
        >
          about
        </span>
      )}
    </div>
  );

  const filterBar = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap",
      }}
    >
      <button
        onClick={() => setActiveTag(null)}
        style={{
          fontFamily: PT_SANS,
          fontSize: 12,
          padding: "4px 8px",
          border: "1px solid #d0d0d0",
          borderRadius: 2,
          cursor: "pointer",
          background: activeTag === null ? "#111" : "none",
          color: activeTag === null ? "#fff" : "#111",
        }}
      >
        all
      </button>
      {ALL_TAGS.map((tag) => (
        <button
          key={tag}
          onClick={() => setActiveTag(activeTag === tag ? null : tag)}
          style={{
            fontFamily: PT_SANS,
            fontSize: 12,
            padding: "4px 8px",
            border: "1px solid #d0d0d0",
            borderRadius: 2,
            cursor: "pointer",
            background: activeTag === tag ? "#111" : "none",
            color: activeTag === tag ? "#fff" : "#111",
          }}
        >
          {tag}
        </button>
      ))}
    </div>
  );

  const projectGrid = (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 16,
      }}
    >
      {filtered.map((p, i) => (
        <div key={i}>
          <div
            onClick={() => {
              p.url && setActiveUrl(p.url);
              setMenuOpen(false);
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              aspectRatio: "1 / 1",
              background: "#d0d0d0",
              marginBottom: 4,
              cursor: p.url ? "pointer" : "default",
              overflow: "hidden",
              transform:
                hoveredIndex === i ? "translateY(-2px)" : "translateY(0)",
              boxShadow:
                hoveredIndex === i ? "0 4px 10px rgba(0,0,0,0.15)" : "none",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            {p.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.image}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            )}
          </div>
          <p
            style={{
              fontFamily: PT_SANS,
              fontSize: 13,
              color: "#111",
              marginBottom: 2,
            }}
          >
            {p.title}
          </p>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {p.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: PT_SANS,
                  fontSize: 10,
                  color: "#888",
                  border: "1px solid #d0d0d0",
                  borderRadius: 2,
                  padding: "1px 5px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const canvas = (
    <div
      ref={canvasRef}
      onMouseEnter={() => setCanvasHovered(true)}
      onMouseLeave={() => setCanvasHovered(false)}
      style={{
        flex: 1,
        position: "relative",
        overflow: "hidden",
        background: "#ebebeb",
      }}
    >
      {activeUrl ? (
        <>
          <button
            onClick={() => setActiveUrl(null)}
            style={{
              position: "absolute",
              top: 12,
              right: 16,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: PT_SANS,
              fontSize: 13,
              color: "#0BDA51",
              zIndex: 1,
            }}
          >
            close
          </button>
          <iframe
            src={activeUrl}
            style={{ width: "100%", height: "100%", border: "none" }}
            allow="fullscreen"
          />
        </>
      ) : (
        <>
          {/* Scattered trees */}
          {TREES.map((pos, i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                ...pos,
                lineHeight: 0,
                zIndex: 1,
              }}
            >
              <PineTree size={28} />
            </span>
          ))}

          {/* Wandering dino */}
          <CanvasWanderer active={canvasHovered} containerRef={canvasRef} />
        </>
      )}
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {isMobile ? (
        <>
          {/* Mobile top bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 20px",
              borderBottom: "1px solid #d0d0d0",
              flexShrink: 0,
            }}
          >
            {titleButton}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              style={{
                fontFamily: PT_SANS,
                fontSize: 32,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                lineHeight: 1,
                color: "#111",
              }}
            >
              {menuOpen ? "×" : "≡"}
            </button>
          </div>

          {/* Collapsible menu */}
          {menuOpen && (
            <div
              style={{
                padding: "24px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                overflowY: "auto",
                flex: 1,
                width: "100%",
                borderBottom: "1px solid #d0d0d0",
                boxSizing: "border-box",
              }}
            >
              {aboutButton}
              {filterBar}
              {projectGrid}
            </div>
          )}

          {/* Canvas fills remaining space when menu is closed */}
          {!menuOpen && canvas}
        </>
      ) : (
        <>
          {/* Desktop left panel */}
          <div
            style={{
              width: "clamp(260px, 30%, 380px)",
              display: "flex",
              flexDirection: "column",
              padding: "clamp(20px, 4vw, 48px)",
              gap: 20,
              overflowY: "auto",
              borderRight: "1px solid #d0d0d0",
            }}
          >
            {titleButton}
            {aboutButton}
            {filterBar}
            {projectGrid}
          </div>
          {canvas}
        </>
      )}

      {aboutOpen && <AboutModal onClose={() => setAboutOpen(false)} />}
    </div>
  );
}
