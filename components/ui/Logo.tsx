import React from "react";
import styles from "./Logo.module.css";

interface LogoProps {
  variant?: "mark" | "full";
  size?: number;
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
  priority?: boolean;
}

export default function Logo({
  variant = "mark",
  size = 40,
  width,
  height,
  className = "",
  alt = "After the Upgrade Logo",
}: LogoProps) {
  if (variant === "full") {
    const finalWidth = width ?? 260;
    const finalHeight = height ?? 52;

    return (
      <span className={`${styles.logoWrapper} ${className}`} aria-label={alt} role="img">
        <svg
          viewBox="0 0 360 72"
          width={finalWidth}
          height={finalHeight}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="chipGradFull" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#182028" />
              <stop offset="100%" stopColor="#0d1117" />
            </linearGradient>
          </defs>

          {/* Icon Mark scaled at left */}
          <g transform="translate(4, 4) scale(0.64)">
            <rect x="2" y="2" width="96" height="96" rx="20" fill="#0e1217" stroke="#252d38" strokeWidth="2" />
            <line x1="2" y1="50" x2="98" y2="50" stroke="#1f2733" strokeWidth="1" strokeDasharray="2 3" />
            <line x1="50" y1="2" x2="50" y2="98" stroke="#1f2733" strokeWidth="1" strokeDasharray="2 3" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="#18202a" strokeWidth="1.5" />

            <path d="M 50,12 A 38,38 0 0,1 86,58 L 82,56" fill="none" stroke="#00ccff" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 86,58 A 38,38 0 0,1 50,88" fill="none" stroke="#00ff66" strokeWidth="4.5" strokeLinecap="round" />
            <polygon points="46,84 52,88 46,92" fill="#00ff66" />

            <path d="M 50,88 A 38,38 0 0,1 14,44 L 18,46" fill="none" stroke="#00ff66" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 14,44 A 38,38 0 0,1 48,12" fill="none" stroke="#00ccff" strokeWidth="4.5" strokeLinecap="round" />
            <polygon points="54,16 48,12 54,8" fill="#00ccff" />

            <circle cx="77" cy="23" r="3.5" fill="#0e1217" stroke="#00ccff" strokeWidth="2" />
            <circle cx="77" cy="23" r="1.5" fill="#00ccff" />
            <circle cx="23" cy="77" r="3.5" fill="#0e1217" stroke="#00ff66" strokeWidth="2" />
            <circle cx="23" cy="77" r="1.5" fill="#00ff66" />

            <g transform="translate(50, 50)">
              <line x1="-16" y1="-22" x2="-16" y2="-17" stroke="#00ccff" strokeWidth="2" />
              <line x1="0" y1="-22" x2="0" y2="-17" stroke="#00ff66" strokeWidth="2" />
              <line x1="16" y1="-22" x2="16" y2="-17" stroke="#00ccff" strokeWidth="2" />
              <line x1="-16" y1="17" x2="-16" y2="22" stroke="#00ff66" strokeWidth="2" />
              <line x1="0" y1="17" x2="0" y2="22" stroke="#00ccff" strokeWidth="2" />
              <line x1="16" y1="17" x2="16" y2="22" stroke="#00ff66" strokeWidth="2" />
              <line x1="-22" y1="-10" x2="-17" y2="-10" stroke="#00ccff" strokeWidth="2" />
              <line x1="-22" y1="10" x2="-17" y2="10" stroke="#00ff66" strokeWidth="2" />
              <line x1="17" y1="-10" x2="22" y2="-10" stroke="#00ccff" strokeWidth="2" />
              <line x1="17" y1="10" x2="22" y2="10" stroke="#00ff66" strokeWidth="2" />

              <rect x="-18" y="-18" width="36" height="36" rx="5" fill="url(#chipGradFull)" stroke="#3d4957" strokeWidth="1.5" />
              <circle cx="-12" cy="-12" r="2" fill="#00ccff" />

              <path d="M -10,10 L -4,-8 L 2,10 M -8,4 L 0,4" fill="none" stroke="#00ff66" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 0,-8 L 0,4 Q 0,10 6,10 Q 12,10 12,4 L 12,-8" fill="none" stroke="#00ccff" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M -5,-11 L 0,-15 L 5,-11" fill="none" stroke="#00ff66" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>

          {/* Typography */}
          <g transform="translate(82, 22)">
            <text x="0" y="4" fill="#00ccff" fontFamily="var(--font-mono, monospace)" fontSize="9" fontWeight="700" letterSpacing="1.5">INITIATIVE // HARDWARE STEWARDSHIP</text>
            <text x="0" y="24" fill="#ffffff" fontFamily="system-ui, -apple-system, sans-serif" fontSize="18" fontWeight="900" letterSpacing="0.5">AFTER THE UPGRADE</text>
            <text x="0" y="40" fill="#00ff66" fontFamily="var(--font-mono, monospace)" fontSize="10" fontWeight="700" letterSpacing="1">REPAIR • REUSE • RETURN RESPONSIBLY</text>
          </g>
        </svg>
      </span>
    );
  }

  // Standalone Mark
  const markSize = width ?? height ?? size;

  return (
    <span className={`${styles.logoWrapper} ${className}`} aria-label={alt} role="img">
      <svg
        viewBox="0 0 100 100"
        width={markSize}
        height={markSize}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="chipGradMark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#182028" />
            <stop offset="100%" stopColor="#0d1117" />
          </linearGradient>
        </defs>

        {/* Dark Shield Background */}
        <rect x="2" y="2" width="96" height="96" rx="20" fill="#0e1217" stroke="#252d38" strokeWidth="2" />

        {/* Subtle Grid Coordinates */}
        <line x1="2" y1="50" x2="98" y2="50" stroke="#1f2733" strokeWidth="1" strokeDasharray="2 3" />
        <line x1="50" y1="2" x2="50" y2="98" stroke="#1f2733" strokeWidth="1" strokeDasharray="2 3" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="#18202a" strokeWidth="1.5" />

        {/* Outer Regenerative Loop Arc 1 */}
        <path d="M 50,12 A 38,38 0 0,1 86,58 L 82,56" fill="none" stroke="#00ccff" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M 86,58 A 38,38 0 0,1 50,88" fill="none" stroke="#00ff66" strokeWidth="4.5" strokeLinecap="round" />
        <polygon points="46,84 52,88 46,92" fill="#00ff66" />

        {/* Outer Regenerative Loop Arc 2 */}
        <path d="M 50,88 A 38,38 0 0,1 14,44 L 18,46" fill="none" stroke="#00ff66" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M 14,44 A 38,38 0 0,1 48,12" fill="none" stroke="#00ccff" strokeWidth="4.5" strokeLinecap="round" />
        <polygon points="54,16 48,12 54,8" fill="#00ccff" />

        {/* Circuit Trace Nodes */}
        <circle cx="77" cy="23" r="3.5" fill="#0e1217" stroke="#00ccff" strokeWidth="2" />
        <circle cx="77" cy="23" r="1.5" fill="#00ccff" />
        <circle cx="23" cy="77" r="3.5" fill="#0e1217" stroke="#00ff66" strokeWidth="2" />
        <circle cx="23" cy="77" r="1.5" fill="#00ff66" />

        {/* Central Silicon Microchip Package */}
        <g transform="translate(50, 50)">
          <line x1="-16" y1="-22" x2="-16" y2="-17" stroke="#00ccff" strokeWidth="2" />
          <line x1="0" y1="-22" x2="0" y2="-17" stroke="#00ff66" strokeWidth="2" />
          <line x1="16" y1="-22" x2="16" y2="-17" stroke="#00ccff" strokeWidth="2" />
          <line x1="-16" y1="17" x2="-16" y2="22" stroke="#00ff66" strokeWidth="2" />
          <line x1="0" y1="17" x2="0" y2="22" stroke="#00ccff" strokeWidth="2" />
          <line x1="16" y1="17" x2="16" y2="22" stroke="#00ff66" strokeWidth="2" />
          <line x1="-22" y1="-10" x2="-17" y2="-10" stroke="#00ccff" strokeWidth="2" />
          <line x1="-22" y1="10" x2="-17" y2="10" stroke="#00ff66" strokeWidth="2" />
          <line x1="17" y1="-10" x2="22" y2="-10" stroke="#00ccff" strokeWidth="2" />
          <line x1="17" y1="10" x2="22" y2="10" stroke="#00ff66" strokeWidth="2" />

          <rect x="-18" y="-18" width="36" height="36" rx="5" fill="url(#chipGradMark)" stroke="#3d4957" strokeWidth="1.5" />
          <circle cx="-12" cy="-12" r="2" fill="#00ccff" />

          <path d="M -10,10 L -4,-8 L 2,10 M -8,4 L 0,4" fill="none" stroke="#00ff66" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 0,-8 L 0,4 Q 0,10 6,10 Q 12,10 12,4 L 12,-8" fill="none" stroke="#00ccff" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M -5,-11 L 0,-15 L 5,-11" fill="none" stroke="#00ff66" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </span>
  );
}
