"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

function PixelDino() {
  return (
    <svg
      width="48"
      height="32"
      viewBox="0 0 12 8"
      style={{ imageRendering: "pixelated" }}
    >
      <rect x="3" y="3" width="6" height="4" fill="#0015FF" />
      <rect x="7" y="1" width="3" height="3" fill="#0015FF" />
      <rect x="9" y="2" width="2" height="1" fill="#0015FF" />
      <rect x="8" y="1" width="1" height="1" fill="#0015FF" />
      <rect x="4" y="7" width="1" height="1" fill="#0015FF" />
      <rect x="6" y="7" width="1" height="1" fill="#0015FF" />
      <rect x="2" y="4" width="1" height="1" fill="#0015FF" />
      <rect x="1" y="5" width="1" height="1" fill="#0015FF" />
    </svg>
  );
}
