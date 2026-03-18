"use client";

import { useState, useEffect } from "react";
import { PROJECTS, SIDEBAR_ITEMS, type Contribution } from "../data/projects";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

const PT_SANS = '"PT Sans", sans-serif';
const COURIER = '"Courier New", Courier, monospace';

// ─── Contribution row ──────────────────────────────────────────────────────────
function ContributionItem({
  item,
  expanded,
  onToggle,
  isMobile,
}: {
  item: Contribution;
  expanded: boolean;
  onToggle: () => void;
  isMobile: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ marginBottom: expanded ? 32 : 20 }}>
      {/* title row */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onToggle}
        style={{ cursor: "pointer", marginBottom: 4, display: "inline-block" }}
      >
        <span
          style={{
            fontFamily: PT_SANS,
            fontWeight: 600,
            fontSize: 16,
            color: !expanded && hovered && item.hoverImage ? "#0015FF" : "#111",
            transition: "color 0.15s",
          }}
        >
          {item.title}
        </span>
      </div>
      <p
        style={{
          fontFamily: PT_SANS,
          fontSize: 15,
          color: "#444",
          lineHeight: 1.5,
          marginBottom: expanded ? 16 : 0,
        }}
      >
        {item.description}
      </p>

      {/* expanded content */}
      {expanded && (
        <div>
          <p
            style={{
              fontFamily: PT_SANS,
              fontSize: 15,
              color: "#555",
              lineHeight: 1.5,
              marginBottom: 16,
              maxWidth: 520,
              whiteSpace: "pre-line",
            }}
          >
            {item.expandedText}
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 16,
              overflowX: isMobile ? "visible" : "auto",
              width: "100%",
              maxWidth: "100vw",
            }}
          >
            {[0, 1, 2].map((i) => {
              const img = item.expandedImages?.[i];
              if (!img) return null;
              return (
                <div key={i} style={isMobile ? { width: "100%" } : undefined}>
                  <div
                    style={{
                      width: isMobile ? "100%" : 600,
                      aspectRatio: "4/3",
                      background: "#d8d8d8",
                      marginBottom: 6,
                      overflow: "hidden",
                    }}
                  >
                    {img &&
                      (img.src.endsWith(".mp4") ? (
                        <video
                          src={img.src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={img.src}
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                          onError={(e) => {
                            (
                              e.currentTarget as HTMLImageElement
                            ).style.display = "none";
                          }}
                        />
                      ))}
                  </div>
                  <p
                    style={{
                      fontFamily: COURIER,
                      fontSize: 12,
                      color: "#464646",
                    }}
                  >
                    {img?.caption ?? ""}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* hover image popup — desktop only */}
      {!isMobile && !expanded && hovered && item.hoverImage && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 100,
            pointerEvents: "none",
            animation: "cardIn 0.18s ease forwards",
          }}
        >
          <div
            style={{
              width: 320,
              aspectRatio: "4/3",
              background: "#d8d8d8",
              overflow: "hidden",
            }}
          >
            {item.hoverImage.endsWith(".mp4") ? (
              <video
                src={item.hoverImage}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.hoverImage}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function ProjectTabs() {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("Presence AI");
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [openSidebar, setOpenSidebar] = useState<Set<string>>(new Set());

  const project = PROJECTS.find((p) => p.label === activeTab) ?? PROJECTS[0];

  // On mobile, start with all items expanded; toggle still works
  useEffect(() => {
    if (isMobile) {
      setExpandedItems(new Set(project.contributions.map((_, i) => i)));
    } else {
      setExpandedItems(new Set());
    }
  }, [isMobile, activeTab, project.contributions]);

  const toggleItem = (i: number) =>
    setExpandedItems((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  const toggleSidebar = (key: string) => {
    setOpenSidebar((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* ── Tab row ── */}
      <div
        style={{
          flexShrink: 0,
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "32px clamp(24px, 8vw, 120px) 32px",
        }}
      >
        {PROJECTS.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setActiveTab(p.label);
              setExpandedItems(new Set());
            }}
            className={`proj-tab${activeTab === p.label ? " proj-tab--active" : ""}`}
            style={{
              padding: "10px 20px",
              border: "1px solid #0015FF",
              borderRadius: 0,
              background: activeTab === p.label ? "#0015FF" : "transparent",
              color: activeTab === p.label ? "#fff" : "#0015FF",
              fontFamily: PT_SANS,
              fontSize: 15,
              fontWeight: 500,
              cursor: "pointer",
              transition: "background 0.15s, color 0.15s",
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* ── Two-column layout ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          gap: 48,
          overflow: "hidden",
          padding: "0 clamp(24px, 8vw, 120px)",
        }}
      >
        {/* Left sidebar — hidden on mobile */}
        <div
          style={{
            width: 160,
            flexShrink: 0,
            display: isMobile ? "none" : "flex",
            flexDirection: "column",
            paddingBottom: 40,
            paddingTop: 8,
          }}
        >
          {SIDEBAR_ITEMS.map((key) => (
            <div key={key} style={{ marginBottom: 16 }}>
              <button
                onClick={() => toggleSidebar(key)}
                className="proj-sidebar-btn"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: PT_SANS,
                  fontSize: 15,
                  color: "#0015FF",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span>{openSidebar.has(key) ? "−" : "+"}</span>
                <span>{key}</span>
              </button>
              {openSidebar.has(key) && (
                <p
                  style={{
                    fontFamily: PT_SANS,
                    fontSize: 13,
                    color: "#555",
                    lineHeight: 1.6,
                    marginTop: 8,
                    paddingLeft: 16,
                  }}
                >
                  {project.sidebar[key]}
                </p>
              )}
            </div>
          ))}

          {/* expand button — bottom of left column */}
          <div
            style={{
              marginTop: 32,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <button
              onClick={() => {
                const allExpanded = project.contributions.every((_, i) =>
                  expandedItems.has(i),
                );
                setExpandedItems(
                  allExpanded
                    ? new Set()
                    : new Set(project.contributions.map((_, i) => i)),
                );
              }}
              className="proj-expand-btn"
              style={{
                background: "none",
                border: "1px solid #0015FF",
                borderRadius: "50%",
                width: 28,
                height: 28,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                color: "#0015FF",
                fontFamily: PT_SANS,
                fontSize: 14,
                lineHeight: 1,
                flexShrink: 0,
                transition: "background 0.15s, color 0.15s",
              }}
            >
              {project.contributions.every((_, i) => expandedItems.has(i))
                ? "−"
                : "+"}
            </button>
            <span
              style={{ fontFamily: PT_SANS, fontSize: 13, color: "#0015FF" }}
            >
              {project.contributions.every((_, i) => expandedItems.has(i))
                ? "collapse all"
                : "expand all"}
            </span>
          </div>
        </div>

        {/* Right content — scrollable */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            overflowY: "auto",
            paddingBottom: 120,
            paddingTop: 8,
          }}
        >
          {/* project summary */}
          <p
            style={{
              fontFamily: PT_SANS,
              fontSize: 16,
              color: "#111",
              marginBottom: 28,
              lineHeight: 1.6,
              whiteSpace: "pre-line",
            }}
          >
            {project.summary.map((seg, i) =>
              typeof seg === "string" ? (
                seg
              ) : (
                <a
                  key={i}
                  href={seg.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#0015FF",
                    textDecoration: "underline",
                    textUnderlineOffset: 3,
                  }}
                >
                  {seg.text}
                </a>
              ),
            )}
          </p>

          {/* My contribution heading */}
          <p
            style={{
              fontFamily: PT_SANS,
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: 16,
              color: "#111",
              marginTop: 40,
              marginBottom: 20,
            }}
          >
            My contribution
          </p>

          {project.contributions.map((item, i) => (
            <ContributionItem
              key={item.title}
              item={item}
              expanded={expandedItems.has(i)}
              onToggle={() => toggleItem(i)}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
