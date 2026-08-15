export function MicroscopeVisual() {
  return (
    <div
      className="microscope-visual relative flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[18px] border border-white/14 bg-[rgba(9,22,40,0.55)]"
      aria-hidden="true"
    >
      {/* Atmosphere: grid arcs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-18%] right-[-12%] size-[420px] rounded-full border border-blue/20" />
        <div className="absolute top-[6%] right-[-22%] size-[560px] rounded-full border border-white/[0.07]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(30,91,217,0.14),transparent_55%)]" />
      </div>

      <div className="relative z-10 flex min-h-[46px] shrink-0 flex-col justify-center gap-1 border-b border-white/14 px-4 py-3 font-display text-[0.55rem] tracking-[0.09em] text-white/48 uppercase sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:py-0">
        <span>Analytical workflow</span>
        <span>03 / Analyse</span>
      </div>

      <div className="relative z-10 flex min-h-[clamp(300px,72vw,420px)] flex-1 items-center justify-center sm:min-h-[clamp(340px,48vw,460px)] lg:min-h-[clamp(380px,32vw,500px)]">
        <svg
          viewBox="8 12 504 308"
          className="h-full w-full max-h-full px-1 pb-1 sm:px-2 sm:pb-2"
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
        >
        <defs>
          <linearGradient id="scope-base-fill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(203,213,225,0.22)" />
            <stop offset="100%" stopColor="rgba(30,91,217,0.18)" />
          </linearGradient>
          <linearGradient id="scope-body-fill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(148,163,184,0.16)" />
            <stop offset="100%" stopColor="rgba(30,91,217,0.12)" />
          </linearGradient>
          <filter id="scope-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Coordinate grid */}
        <g fill="none" stroke="rgba(203,213,225,0.055)" strokeWidth="1">
          <path d="M42 58H478M42 112H478M42 166H478M42 220H478M42 274H478" />
          <path d="M96 28V302M174 28V302M252 28V302M330 28V302M408 28V302" />
        </g>

        {/* Left scale ticks */}
        <g fill="none" stroke="rgba(203,213,225,0.28)" strokeWidth="1">
          <path d="M52 48H68M52 70H61M52 92H61M52 114H68M52 136H61M52 158H61M52 180H68M52 202H61M52 224H61M52 246H68M52 268H61" />
        </g>

        {/* Instrument */}
        <g
          strokeLinecap="round"
          strokeLinejoin="round"
          className="microscope-instrument"
        >
          {/* Base */}
          <path
            d="M85 284H326C357 284 383 294 398 311H70C73 299 78 290 85 284Z"
            fill="url(#scope-base-fill)"
            stroke="#cbd5e1"
            strokeWidth="2"
          />

          {/* Arm — thick outer curve */}
          <path
            d="M295 282C345 247 371 198 356 150C346 116 321 89 289 72"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="14"
            className="microscope-arm"
          />
          {/* Arm — inner accent */}
          <path
            d="M275 273C315 242 332 204 319 166C312 145 297 127 278 114"
            fill="none"
            stroke="#64748b"
            strokeWidth="3"
          />

          {/* Ocular head — blue accent */}
          <path
            d="M215 34L289 60L279 87L205 61Z"
            fill="#1E5BD9"
            stroke="#dbe7ff"
            strokeWidth="2"
            className="microscope-ocular"
          />
          {/* Body tube */}
          <path
            d="M221 67L277 87L249 148L194 128Z"
            fill="url(#scope-body-fill)"
            stroke="#cbd5e1"
            strokeWidth="2"
          />
          {/* Nosepiece */}
          <path
            d="M188 128C207 122 237 128 255 142L246 154C226 146 204 142 183 143Z"
            fill="rgba(203,213,225,0.2)"
            stroke="#cbd5e1"
            strokeWidth="2"
          />

          {/* Objective stems */}
          <path
            d="M199 144L194 179M219 147L218 181M239 151L245 180"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="3"
          />
          {/* Objective housings */}
          <path
            d="M191 174H201L199 188H188ZM213 176H223L223 190H212ZM239 175H249L252 188H241Z"
            fill="rgba(203,213,225,0.55)"
            stroke="#cbd5e1"
            strokeWidth="1.5"
          />

          {/* Stage rails */}
          <path
            d="M116 188H302M133 198H275"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="5"
          />
          {/* Slide */}
          <rect
            x="160"
            y="179"
            width="76"
            height="5"
            rx="2.5"
            fill="#1E5BD9"
            className="microscope-slide"
          />

          {/* Focus knobs */}
          <circle
            cx="314"
            cy="132"
            r="22"
            fill="#1E5BD9"
            stroke="#cbd5e1"
            strokeWidth="3"
            className="microscope-focus"
          />
          <circle
            cx="314"
            cy="132"
            r="9"
            fill="#64748b"
            stroke="#cbd5e1"
            strokeWidth="2"
          />
          <g className="microscope-focus-dial">
            <path
              d="M314 118V122M314 142V146M300 132H304M324 132H328"
              fill="none"
              stroke="rgba(219,231,255,0.7)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
          <circle
            cx="337"
            cy="159"
            r="9"
            fill="#64748b"
            stroke="#cbd5e1"
            strokeWidth="2"
          />

          {/* Condenser */}
          <path
            d="M202 200H239L232 220H209Z"
            fill="rgba(203,213,225,0.15)"
            stroke="#94a3b8"
            strokeWidth="2"
          />
          {/* Light source */}
          <path
            d="M208 246C212 224 232 224 236 246Z"
            fill="rgba(30,91,217,0.55)"
            stroke="#dbe7ff"
            strokeWidth="2"
            filter="url(#scope-glow)"
            className="microscope-light"
          />
          {/* Stand posts */}
          <path
            d="M221 244V284M264 265V284"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="3"
          />
        </g>

        {/* Callouts */}
        <g className="microscope-callouts">
          <path
            d="M286 58H412"
            fill="none"
            stroke="rgba(203,213,225,0.34)"
            strokeWidth="1"
            className="microscope-leader"
            style={{ animationDelay: "0.85s" }}
          />
          <circle
            cx="286"
            cy="58"
            r="3"
            fill="#1E5BD9"
            className="microscope-dot"
            style={{ animationDelay: "1s" }}
          />
          <text
            x="420"
            y="62"
            fill="rgba(255,255,255,0.46)"
            fontFamily="var(--font-manrope), Manrope, sans-serif"
            fontSize="8"
            letterSpacing="0.12em"
          >
            OCULAR
          </text>

          <path
            d="M302 188H412"
            fill="none"
            stroke="rgba(203,213,225,0.34)"
            strokeWidth="1"
            className="microscope-leader"
            style={{ animationDelay: "1.05s" }}
          />
          <circle
            cx="302"
            cy="188"
            r="3"
            fill="#1E5BD9"
            className="microscope-dot"
            style={{ animationDelay: "1.2s" }}
          />
          <text
            x="420"
            y="192"
            fill="rgba(255,255,255,0.46)"
            fontFamily="var(--font-manrope), Manrope, sans-serif"
            fontSize="8"
            letterSpacing="0.12em"
          >
            STAGE
          </text>

          <path
            d="M232 238H412"
            fill="none"
            stroke="rgba(203,213,225,0.34)"
            strokeWidth="1"
            className="microscope-leader"
            style={{ animationDelay: "1.25s" }}
          />
          <circle
            cx="232"
            cy="238"
            r="3"
            fill="#1E5BD9"
            className="microscope-dot"
            style={{ animationDelay: "1.4s" }}
          />
          <text
            x="420"
            y="242"
            fill="rgba(255,255,255,0.46)"
            fontFamily="var(--font-manrope), Manrope, sans-serif"
            fontSize="8"
            letterSpacing="0.12em"
          >
            LIGHT
          </text>
        </g>
      </svg>
      </div>
    </div>
  );
}
