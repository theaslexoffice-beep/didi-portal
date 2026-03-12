/**
 * DIDI Logo — Symbol of citizen empowerment
 * 
 * Design concept: 
 * - Two hands forming a protective arch = community support ("Didi" = elder sister)
 * - A rising figure at center = empowered citizen
 * - Warm colors (terracotta → teal gradient) = Chhattisgarhi cultural roots
 * - Clean, modern, scalable SVG
 */

export default function Logo({ size = 48, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="DIDI Logo"
    >
      {/* Background circle */}
      <defs>
        <linearGradient id="didi-grad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E63946" />
          <stop offset="50%" stopColor="#F77F00" />
          <stop offset="100%" stopColor="#2A9D8F" />
        </linearGradient>
        <linearGradient id="didi-inner" x1="30" y1="20" x2="90" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F0F0F0" />
        </linearGradient>
      </defs>
      
      {/* Outer circle with gradient */}
      <circle cx="60" cy="60" r="58" fill="url(#didi-grad)" />
      <circle cx="60" cy="60" r="54" fill="#FFFFFF" fillOpacity="0.12" />
      
      {/* Left hand reaching up — community support */}
      <path
        d="M28 78 C28 78, 22 55, 30 40 C38 25, 48 22, 50 30 C52 38, 42 48, 38 55 C34 62, 32 72, 28 78Z"
        fill="white"
        fillOpacity="0.95"
      />
      
      {/* Right hand reaching up — community support (mirrored) */}
      <path
        d="M92 78 C92 78, 98 55, 90 40 C82 25, 72 22, 70 30 C68 38, 78 48, 82 55 C86 62, 88 72, 92 78Z"
        fill="white"
        fillOpacity="0.95"
      />
      
      {/* Central figure — empowered citizen rising */}
      {/* Head */}
      <circle cx="60" cy="38" r="10" fill="white" />
      
      {/* Body — rising upward stance */}
      <path
        d="M60 48 L60 72"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
      />
      
      {/* Arms raised in triumph / namaste */}
      <path
        d="M44 58 L60 50 L76 58"
        stroke="white"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Legs — stable stance */}
      <path
        d="M60 72 L48 88"
        stroke="white"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path
        d="M60 72 L72 88"
        stroke="white"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      
      {/* Small decorative dots — representing citizens/community (constellation) */}
      <circle cx="38" cy="28" r="2.5" fill="white" fillOpacity="0.7" />
      <circle cx="82" cy="28" r="2.5" fill="white" fillOpacity="0.7" />
      <circle cx="26" cy="50" r="2" fill="white" fillOpacity="0.5" />
      <circle cx="94" cy="50" r="2" fill="white" fillOpacity="0.5" />
      <circle cx="60" cy="18" r="2" fill="white" fillOpacity="0.6" />
      
      {/* Bottom arc — foundation/ground */}
      <path
        d="M32 92 Q60 100, 88 92"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        fillOpacity="0.8"
      />
    </svg>
  );
}

// Compact version for small spaces (navbar, favicon)
export function LogoMark({ size = 32, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="DIDI"
    >
      <defs>
        <linearGradient id="didi-sm-grad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E63946" />
          <stop offset="50%" stopColor="#F77F00" />
          <stop offset="100%" stopColor="#2A9D8F" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="31" fill="url(#didi-sm-grad)" />
      {/* Simplified figure with namaste hands */}
      <circle cx="32" cy="20" r="6" fill="white" />
      <path d="M32 26 L32 40" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M24 33 L32 27 L40 33" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 40 L25 50" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <path d="M32 40 L39 50" stroke="white" strokeWidth="3" strokeLinecap="round" />
      {/* Community dots */}
      <circle cx="18" cy="25" r="1.5" fill="white" fillOpacity="0.6" />
      <circle cx="46" cy="25" r="1.5" fill="white" fillOpacity="0.6" />
      <circle cx="32" cy="10" r="1.5" fill="white" fillOpacity="0.6" />
    </svg>
  );
}
