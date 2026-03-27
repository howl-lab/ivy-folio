"use client";

import { useState, useEffect } from "react";

const LINES = [
  "experiments + play",
  "Generalist. 8+ yr experiences",
  "0-1 tools + big ideas + interfaces",
];

const DISPLAY_MS = 3000;
const FADE_MS = 400;

export default function TextCycler({ style }: { style?: React.CSSProperties }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % LINES.length);
        setVisible(true);
      }, FADE_MS);
    }, DISPLAY_MS + FADE_MS);
    return () => clearInterval(cycle);
  }, []);

  return (
    <span
      style={{
        display: "inline-block",
        opacity: visible ? 1 : 0,
        transition: `opacity ${FADE_MS}ms ease`,
        ...style,
      }}
    >
      {LINES[index]}
    </span>
  );
}
