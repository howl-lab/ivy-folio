"use client";

import { useState } from "react";

const PT_SANS = '"PT Sans", sans-serif';

const PLACEHOLDERS = [
  {
    title: "minesweeper",
    url: "https://v0-simple-minesweeper-game.vercel.app/",
    image: "images/minesweeper.jpg",
  },
  { title: "Project title", url: "", image: "" },
  { title: "Project title", url: "", image: "" },
  { title: "Project title", url: "", image: "" },
  { title: "Project title", url: "", image: "" },
  { title: "Project title", url: "", image: "" },
  { title: "Project title", url: "", image: "" },
  { title: "Project title", url: "", image: "" },
];

export default function ProjectApps() {
  const [activeUrl, setActiveUrl] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 clamp(24px, 8vw, 120px)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
            width: "100%",
            maxWidth: 600,
          }}
        >
          {PLACEHOLDERS.map((p, i) => (
            <div key={i}>
              <div
                onClick={() => p.url && setActiveUrl(p.url)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  aspectRatio: "1 / 1",
                  background: "#d0d0d0",
                  marginBottom: 8,
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
              <p style={{ fontFamily: PT_SANS, fontSize: 13, color: "#111" }}>
                {p.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Embed modal */}
      {activeUrl && (
        <div
          onClick={() => setActiveUrl(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9990,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(900px, 90vw)",
              height: "min(600px, 80vh)",
              background: "#fff",
              position: "relative",
            }}
          >
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
                color: "#0015FF",
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
          </div>
        </div>
      )}
    </>
  );
}
