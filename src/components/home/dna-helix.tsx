"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const STRAND_A =
  "M58 18C58 40 152 50 152 72C152 94 58 104 58 126C58 148 152 158 152 180C152 202 58 212 58 234C58 256 152 266 152 288";
const STRAND_B =
  "M152 18C152 40 58 50 58 72C58 94 152 104 152 126C152 148 58 158 58 180C58 202 152 212 152 234C152 256 58 266 58 288";

/** Glowing DNA helix with entrance + continuous motion. */
export function DnaHelix({ className }: { className?: string }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const rungYs = [28, 62, 96, 130, 164, 198, 232, 266];

  return (
    <div
      className={cn("dna-helix", ready && "dna-helix--ready", className)}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 210 300"
        className="dna-helix__svg h-[250px] w-full max-w-[210px] overflow-visible"
        focusable="false"
      >
        <defs>
          <linearGradient id="dnaStrandA" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7eb6ff" />
            <stop offset="45%" stopColor="#1E5BD9" />
            <stop offset="100%" stopColor="#a8d0ff" />
          </linearGradient>
          <linearGradient id="dnaStrandB" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E5BD9" />
            <stop offset="55%" stopColor="#8ec0ff" />
            <stop offset="100%" stopColor="#3d7cf0" />
          </linearGradient>
          <filter id="dnaGlow" x="-40%" y="-20%" width="180%" height="140%">
            <feGaussianBlur stdDeviation="2.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="dnaNode" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#8ec0ff" />
            <stop offset="100%" stopColor="#1E5BD9" />
          </radialGradient>
        </defs>

        <g
          className="dna-helix__grid"
          fill="none"
          stroke="rgba(183,205,247,0.07)"
          strokeWidth="1"
        >
          <path d="M20 50H190M20 100H190M20 150H190M20 200H190M20 250H190" />
          <path d="M55 18V282M105 18V282M155 18V282" />
        </g>

        <path
          className="dna-helix__axis"
          d="M105 12V288"
          fill="none"
          stroke="rgba(183,205,247,0.22)"
          strokeWidth="1"
          strokeDasharray="3 7"
        />

        <g className="dna-helix__scene" filter="url(#dnaGlow)">
          <g
            className="dna-helix__rungs"
            stroke="rgba(190,210,240,0.55)"
            strokeWidth="1.6"
          >
            {rungYs.map((y, i) => {
              const wide = i % 2 === 0;
              return (
                <line
                  key={y}
                  className="dna-helix__rung"
                  style={{ animationDelay: `${0.55 + i * 0.07}s` }}
                  x1={wide ? 58 : 88}
                  y1={y}
                  x2={wide ? 152 : 122}
                  y2={y}
                />
              );
            })}
          </g>

          <g className="dna-helix__strands" fill="none" strokeLinecap="round">
            <path
              className="dna-helix__strand dna-helix__strand--a"
              stroke="url(#dnaStrandA)"
              strokeWidth="5.5"
              d={STRAND_A}
            />
            <path
              className="dna-helix__strand dna-helix__strand--b"
              stroke="url(#dnaStrandB)"
              strokeWidth="5.5"
              d={STRAND_B}
            />
            <path
              className="dna-helix__flow dna-helix__flow--a"
              stroke="#ffffff"
              strokeWidth="2"
              strokeOpacity="0.55"
              d={STRAND_A}
            />
            <path
              className="dna-helix__flow dna-helix__flow--b"
              stroke="#cfe2ff"
              strokeWidth="2"
              strokeOpacity="0.45"
              d={STRAND_B}
            />
          </g>

          <g className="dna-helix__nodes">
            {rungYs.map((y, i) => {
              const wide = i % 2 === 0;
              const left = wide ? 58 : 88;
              const right = wide ? 152 : 122;
              return (
                <g key={`n-${y}`}>
                  <circle
                    className="dna-helix__node"
                    style={{ animationDelay: `${0.7 + i * 0.08}s` }}
                    cx={left}
                    cy={y}
                    r="4"
                    fill="url(#dnaNode)"
                  />
                  <circle
                    className="dna-helix__node"
                    style={{ animationDelay: `${0.78 + i * 0.08}s` }}
                    cx={right}
                    cy={y}
                    r="4"
                    fill="url(#dnaNode)"
                  />
                </g>
              );
            })}
            {[45, 79, 113, 147, 181, 215, 249].map((y, i) => (
              <circle
                key={`c-${y}`}
                className="dna-helix__node dna-helix__node--cross"
                style={{ animationDelay: `${0.9 + i * 0.06}s` }}
                cx="105"
                cy={y}
                r="2.2"
                fill="#8ec0ff"
                opacity="0.7"
              />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
