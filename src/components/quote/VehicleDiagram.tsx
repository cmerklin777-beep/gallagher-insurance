'use client';

/**
 * Detailed exploded-view SVG vehicle diagram that highlights covered
 * component regions based on tier level.
 * Tier 1 = Essential, 2 = Essential Plus, 3 = Premium, 4 = Exclusive
 */

interface VehicleDiagramProps {
  tierLevel: 1 | 2 | 3 | 4;
}

const REGION_MIN_TIER: Record<string, number> = {
  engine: 1,
  transmission: 1,
  transferCase: 1,
  cvJoints: 2,
  electricalSystem: 2,
  fuelSystem: 2,
  acCompressor: 2,
  turbo: 2,
  sealsGaskets: 2,
  coolingSystem: 3,
  brakeSystem: 3,
  steeringSystem: 3,
  highTech: 4,
  navigation: 4,
  adas: 4,
};

const ACCENT = '#0072CE';
const ACCENT_LIGHT = '#4da3e8';
const DIMMED = '#cbd5e1';
const DIMMED_LIGHT = '#e2e8f0';

function covered(region: string, tier: number): boolean {
  return tier >= REGION_MIN_TIER[region];
}
function fill(region: string, tier: number): string {
  return covered(region, tier) ? ACCENT : DIMMED;
}
function fillLight(region: string, tier: number): string {
  return covered(region, tier) ? ACCENT_LIGHT : DIMMED_LIGHT;
}
function op(region: string, tier: number): number {
  return covered(region, tier) ? 1 : 0.35;
}
function textFill(region: string, tier: number): string {
  return covered(region, tier) ? '#1e3a5f' : '#94a3b8';
}

export default function VehicleDiagram({ tierLevel }: VehicleDiagramProps) {
  const t = tierLevel;

  return (
    <svg
      viewBox="0 0 800 420"
      className="w-full mx-auto"
      aria-label="Vehicle coverage diagram"
      style={{ maxWidth: 700 }}
    >
      <defs>
        <filter id="shadow" x="-4%" y="-4%" width="108%" height="108%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.08" />
        </filter>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <linearGradient id="glassGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="100%" stopColor="#bfdbfe" />
        </linearGradient>
      </defs>

      {/* ═══════════ CENTRAL CAR BODY ═══════════ */}
      {/* Underbody / chassis */}
      <rect x="170" y="270" width="420" height="12" rx="3" fill="#64748b" opacity="0.3" />

      {/* Main body */}
      <path
        d="M135,265 L145,220 L170,190 L220,155 L270,130 L370,120 L480,120 L540,130 L580,155 L620,190 L640,220 L650,265 L650,280 L135,280 Z"
        fill="url(#bodyGrad)"
        stroke="#94a3b8"
        strokeWidth="2"
        filter="url(#shadow)"
      />

      {/* Roof */}
      <path
        d="M272,132 L290,115 L500,115 L520,132"
        fill="none"
        stroke="#94a3b8"
        strokeWidth="1.5"
      />

      {/* Windshield */}
      <path
        d="M225,158 L272,122 L365,118 L365,158 Z"
        fill="url(#glassGrad)"
        stroke="#94a3b8"
        strokeWidth="1.5"
        opacity="0.9"
      />
      {/* Side windows */}
      <path
        d="M367,118 L367,158 L480,158 L480,118 Z"
        fill="url(#glassGrad)"
        stroke="#94a3b8"
        strokeWidth="1"
        opacity="0.85"
      />
      <path
        d="M482,118 L482,158 L540,132 L530,118 Z"
        fill="url(#glassGrad)"
        stroke="#94a3b8"
        strokeWidth="1"
        opacity="0.8"
      />

      {/* Door line */}
      <line x1="365" y1="158" x2="365" y2="268" stroke="#94a3b8" strokeWidth="1" opacity="0.5" />
      <line x1="480" y1="158" x2="480" y2="268" stroke="#94a3b8" strokeWidth="1" opacity="0.5" />

      {/* Headlights */}
      <ellipse cx="155" cy="240" rx="15" ry="10" fill="#fbbf24" opacity="0.5" stroke="#f59e0b" strokeWidth="1" />
      {/* Taillights */}
      <ellipse cx="640" cy="240" rx="12" ry="8" fill="#ef4444" opacity="0.4" stroke="#dc2626" strokeWidth="1" />

      {/* Front bumper */}
      <path d="M132,265 L132,275 Q132,282 140,282 L155,282 L155,265 Z" fill="#94a3b8" opacity="0.4" />
      {/* Rear bumper */}
      <path d="M635,265 L635,282 L650,282 Q658,282 658,275 L658,265 Z" fill="#94a3b8" opacity="0.4" />

      {/* ═══════════ WHEELS ═══════════ */}
      {/* Front wheel */}
      <circle cx="230" cy="290" r="38" fill="#1e293b" />
      <circle cx="230" cy="290" r="30" fill="#334155" />
      <circle cx="230" cy="290" r="18" fill="#475569" />
      <circle cx="230" cy="290" r="8" fill="#64748b" />
      {/* Wheel spokes */}
      {[0, 72, 144, 216, 288].map((angle) => (
        <line
          key={`fw-${angle}`}
          x1={230 + 10 * Math.cos((angle * Math.PI) / 180)}
          y1={290 + 10 * Math.sin((angle * Math.PI) / 180)}
          x2={230 + 28 * Math.cos((angle * Math.PI) / 180)}
          y2={290 + 28 * Math.sin((angle * Math.PI) / 180)}
          stroke="#64748b"
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}

      {/* Rear wheel */}
      <circle cx="560" cy="290" r="38" fill="#1e293b" />
      <circle cx="560" cy="290" r="30" fill="#334155" />
      <circle cx="560" cy="290" r="18" fill="#475569" />
      <circle cx="560" cy="290" r="8" fill="#64748b" />
      {[0, 72, 144, 216, 288].map((angle) => (
        <line
          key={`rw-${angle}`}
          x1={560 + 10 * Math.cos((angle * Math.PI) / 180)}
          y1={290 + 10 * Math.sin((angle * Math.PI) / 180)}
          x2={560 + 28 * Math.cos((angle * Math.PI) / 180)}
          y2={290 + 28 * Math.sin((angle * Math.PI) / 180)}
          stroke="#64748b"
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}

      {/* ═══════════ EXPLODED COMPONENTS ═══════════ */}

      {/* ── ENGINE BLOCK (top-left, exploded out) ── */}
      <g opacity={op('engine', t)}>
        <line x1="185" y1="210" x2="75" y2="90" stroke={fill('engine', t)} strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
        <rect x="20" y="40" width="110" height="70" rx="8" fill={fill('engine', t)} filter="url(#shadow)" />
        {/* Engine detail - cylinder block shape */}
        <rect x="30" y="50" width="90" height="50" rx="4" fill={fillLight('engine', t)} opacity="0.3" />
        <rect x="38" y="55" width="18" height="20" rx="2" fill="white" opacity="0.15" />
        <rect x="60" y="55" width="18" height="20" rx="2" fill="white" opacity="0.15" />
        <rect x="82" y="55" width="18" height="20" rx="2" fill="white" opacity="0.15" />
        <rect x="35" y="80" width="60" height="8" rx="2" fill="white" opacity="0.1" />
        <text x="75" y="68" textAnchor="middle" fill="white" fontSize="9" fontWeight="700">ENGINE</text>
        <text x="75" y="100" textAnchor="middle" fill={textFill('engine', t)} fontSize="7.5">V6 / V8 Block</text>
      </g>

      {/* ── TRANSMISSION (below engine, exploded) ── */}
      <g opacity={op('transmission', t)}>
        <line x1="300" y1="260" x2="180" y2="160" stroke={fill('transmission', t)} strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
        <rect x="20" y="125" width="110" height="55" rx="8" fill={fill('transmission', t)} filter="url(#shadow)" />
        <path d="M35,140 L55,140 L65,155 L55,170 L35,170 Z" fill="white" opacity="0.12" />
        <rect x="70" y="140" width="50" height="28" rx="4" fill="white" opacity="0.12" />
        <text x="75" y="158" textAnchor="middle" fill="white" fontSize="8.5" fontWeight="700">TRANSMISSION</text>
        <text x="75" y="172" textAnchor="middle" fill={textFill('transmission', t)} fontSize="7">Auto / Manual</text>
      </g>

      {/* ── TRANSFER CASE / AWD ── */}
      <g opacity={op('transferCase', t)}>
        <line x1="350" y1="270" x2="180" y2="230" stroke={fill('transferCase', t)} strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
        <rect x="20" y="195" width="110" height="48" rx="8" fill={fill('transferCase', t)} filter="url(#shadow)" />
        <circle cx="50" cy="219" r="12" fill="white" opacity="0.12" />
        <circle cx="100" cy="219" r="12" fill="white" opacity="0.12" />
        <line x1="62" y1="219" x2="88" y2="219" stroke="white" strokeWidth="2" opacity="0.15" />
        <text x="75" y="222" textAnchor="middle" fill="white" fontSize="8" fontWeight="700">TRANSFER CASE</text>
        <text x="75" y="236" textAnchor="middle" fill={textFill('transferCase', t)} fontSize="7">AWD / 4WD</text>
      </g>

      {/* ── TURBO / SUPERCHARGER (top, above engine) ── */}
      <g opacity={op('turbo', t)}>
        <line x1="175" y1="195" x2="195" y2="35" stroke={fill('turbo', t)} strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
        <rect x="155" y="10" width="95" height="42" rx="8" fill={fill('turbo', t)} filter="url(#shadow)" />
        <circle cx="182" cy="31" r="10" fill="white" opacity="0.12" />
        <path d="M195,22 L230,22 L235,31 L230,40 L195,40 Z" fill="white" opacity="0.12" />
        <text x="202" y="35" textAnchor="middle" fill="white" fontSize="8" fontWeight="700">TURBO</text>
      </g>

      {/* ── A/C COMPRESSOR ── */}
      <g opacity={op('acCompressor', t)}>
        <line x1="200" y1="245" x2="115" y2="310" stroke={fill('acCompressor', t)} strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
        <rect x="20" y="290" width="105" height="42" rx="8" fill={fill('acCompressor', t)} filter="url(#shadow)" />
        <circle cx="48" cy="311" r="11" fill="white" opacity="0.12" />
        <rect x="65" y="300" width="48" height="20" rx="3" fill="white" opacity="0.12" />
        <text x="72" y="314" textAnchor="middle" fill="white" fontSize="8" fontWeight="700">A/C</text>
        <text x="72" y="326" textAnchor="middle" fill={textFill('acCompressor', t)} fontSize="6.5">Compressor</text>
      </g>

      {/* ── CV JOINTS / AXLES ── */}
      <g opacity={op('cvJoints', t)}>
        <line x1="230" y1="310" x2="170" y2="380" stroke={fill('cvJoints', t)} strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
        <rect x="20" y="348" width="105" height="42" rx="8" fill={fill('cvJoints', t)} filter="url(#shadow)" />
        <line x1="35" y1="369" x2="110" y2="369" stroke="white" strokeWidth="3" opacity="0.15" strokeLinecap="round" />
        <circle cx="40" cy="369" r="8" fill="white" opacity="0.12" />
        <circle cx="105" cy="369" r="8" fill="white" opacity="0.12" />
        <text x="72" y="373" textAnchor="middle" fill="white" fontSize="8" fontWeight="700">CV JOINTS</text>
        <text x="72" y="385" textAnchor="middle" fill={textFill('cvJoints', t)} fontSize="6.5">Axle Shafts</text>
      </g>

      {/* ── FUEL SYSTEM (bottom-right) ── */}
      <g opacity={op('fuelSystem', t)}>
        <line x1="580" y1="260" x2="670" y2="345" stroke={fill('fuelSystem', t)} strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
        <rect x="650" y="328" width="105" height="48" rx="8" fill={fill('fuelSystem', t)} filter="url(#shadow)" />
        <rect x="665" y="340" width="75" height="24" rx="6" fill="white" opacity="0.12" />
        <text x="702" y="356" textAnchor="middle" fill="white" fontSize="8" fontWeight="700">FUEL SYSTEM</text>
        <text x="702" y="369" textAnchor="middle" fill={textFill('fuelSystem', t)} fontSize="6.5">Pump &amp; Injectors</text>
      </g>

      {/* ── ELECTRICAL (right side, upper) ── */}
      <g opacity={op('electricalSystem', t)}>
        <line x1="540" y1="200" x2="680" y2="140" stroke={fill('electricalSystem', t)} strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
        <rect x="660" y="115" width="110" height="48" rx="8" fill={fill('electricalSystem', t)} filter="url(#shadow)" />
        {/* Wiring harness icon */}
        <path d="M675,132 L685,139 L695,130 L705,142 L715,128 L725,139 L735,132 L745,140" fill="none" stroke="white" strokeWidth="1.5" opacity="0.2" />
        <rect x="675" y="142" width="60" height="12" rx="3" fill="white" opacity="0.1" />
        <text x="715" y="142" textAnchor="middle" fill="white" fontSize="8" fontWeight="700">ELECTRICAL</text>
        <text x="715" y="155" textAnchor="middle" fill={textFill('electricalSystem', t)} fontSize="6.5">Wiring &amp; Modules</text>
      </g>

      {/* ── SEALS & GASKETS (under engine area) ── */}
      <g opacity={op('sealsGaskets', t)}>
        <line x1="265" y1="200" x2="295" y2="30" stroke={fill('sealsGaskets', t)} strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
        <rect x="268" y="10" width="95" height="38" rx="8" fill={fill('sealsGaskets', t)} filter="url(#shadow)" />
        <ellipse cx="315" cy="29" rx="30" ry="8" fill="white" opacity="0.12" />
        <text x="315" y="33" textAnchor="middle" fill="white" fontSize="7.5" fontWeight="700">SEALS &amp; GASKETS</text>
      </g>

      {/* ── COOLING SYSTEM (top-right) ── */}
      <g opacity={op('coolingSystem', t)}>
        <line x1="185" y1="200" x2="420" y2="30" stroke={fill('coolingSystem', t)} strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
        <rect x="385" y="10" width="100" height="42" rx="8" fill={fill('coolingSystem', t)} filter="url(#shadow)" />
        {/* Radiator fins icon */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={`rad-${i}`} x={398 + i * 13} y="20" width="8" height="22" rx="1" fill="white" opacity="0.12" />
        ))}
        <text x="435" y="35" textAnchor="middle" fill="white" fontSize="8" fontWeight="700">COOLING</text>
        <text x="435" y="46" textAnchor="middle" fill={textFill('coolingSystem', t)} fontSize="6.5">Radiator &amp; Hoses</text>
      </g>

      {/* ── BRAKE SYSTEM (bottom, at wheels) ── */}
      <g opacity={op('brakeSystem', t)}>
        {/* Front brake callout */}
        <line x1="230" y1="320" x2="305" y2="390" stroke={fill('brakeSystem', t)} strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
        <rect x="260" y="370" width="100" height="42" rx="8" fill={fill('brakeSystem', t)} filter="url(#shadow)" />
        <circle cx="288" cy="391" r="11" fill="white" opacity="0.12" />
        <rect x="305" y="383" width="40" height="16" rx="3" fill="white" opacity="0.12" />
        <text x="310" y="395" textAnchor="middle" fill="white" fontSize="8" fontWeight="700">BRAKES</text>
        <text x="310" y="406" textAnchor="middle" fill={textFill('brakeSystem', t)} fontSize="6.5">Disc &amp; Caliper</text>
        {/* Brake ring indicators on wheels */}
        <circle cx="230" cy="290" r="34" fill="none" stroke={fill('brakeSystem', t)} strokeWidth="2.5" opacity={op('brakeSystem', t) * 0.6} strokeDasharray="6,4" />
        <circle cx="560" cy="290" r="34" fill="none" stroke={fill('brakeSystem', t)} strokeWidth="2.5" opacity={op('brakeSystem', t) * 0.6} strokeDasharray="6,4" />
      </g>

      {/* ── STEERING (connected to front wheel) ── */}
      <g opacity={op('steeringSystem', t)}>
        <line x1="230" y1="260" x2="305" y2="80" stroke={fill('steeringSystem', t)} strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
        <rect x="268" y="60" width="95" height="42" rx="8" fill={fill('steeringSystem', t)} filter="url(#shadow)" />
        {/* Steering wheel icon */}
        <circle cx="295" cy="81" r="10" fill="none" stroke="white" strokeWidth="1.5" opacity="0.2" />
        <circle cx="295" cy="81" r="3" fill="white" opacity="0.15" />
        <text x="330" y="77" textAnchor="middle" fill="white" fontSize="8" fontWeight="700">STEERING</text>
        <text x="315" y="95" textAnchor="middle" fill={textFill('steeringSystem', t)} fontSize="6.5">Rack &amp; Linkage</text>
      </g>

      {/* ── HIGH-TECH ELECTRONICS (top-right area) ── */}
      <g opacity={op('highTech', t)}>
        <line x1="430" y1="140" x2="560" y2="50" stroke={fill('highTech', t)} strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
        <rect x="505" y="10" width="115" height="42" rx="8" fill={fill('highTech', t)} filter="url(#shadow)" />
        <rect x="520" y="20" width="25" height="18" rx="3" fill="white" opacity="0.12" />
        <rect x="550" y="20" width="55" height="8" rx="2" fill="white" opacity="0.12" />
        <rect x="550" y="32" width="40" height="6" rx="2" fill="white" opacity="0.08" />
        <text x="562" y="35" textAnchor="middle" fill="white" fontSize="7.5" fontWeight="700">HI-TECH</text>
        <text x="562" y="46" textAnchor="middle" fill={textFill('highTech', t)} fontSize="6.5">Electronics</text>
      </g>

      {/* ── NAVIGATION / INFOTAINMENT ── */}
      <g opacity={op('navigation', t)}>
        <line x1="395" y1="150" x2="660" y2="80" stroke={fill('navigation', t)} strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
        <rect x="635" y="60" width="110" height="42" rx="8" fill={fill('navigation', t)} filter="url(#shadow)" />
        {/* Screen icon */}
        <rect x="652" y="68" width="34" height="24" rx="3" fill="white" opacity="0.15" />
        <rect x="656" y="72" width="26" height="16" rx="2" fill="white" opacity="0.08" />
        <text x="712" y="82" textAnchor="middle" fill="white" fontSize="7.5" fontWeight="700">NAV</text>
        <text x="712" y="95" textAnchor="middle" fill={textFill('navigation', t)} fontSize="6.5">Infotainment</text>
      </g>

      {/* ── ADAS (front sensors) ── */}
      <g opacity={op('adas', t)}>
        <line x1="155" y1="230" x2="485" y2="390" stroke={fill('adas', t)} strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
        <rect x="440" y="370" width="110" height="42" rx="8" fill={fill('adas', t)} filter="url(#shadow)" />
        {/* Sensor wave icon */}
        <path d="M465,385 Q470,380 475,385 Q480,390 485,385" fill="none" stroke="white" strokeWidth="1.5" opacity="0.2" />
        <path d="M460,391 Q468,383 476,391 Q484,399 492,391" fill="none" stroke="white" strokeWidth="1.5" opacity="0.15" />
        <text x="495" y="395" textAnchor="middle" fill="white" fontSize="8" fontWeight="700">ADAS</text>
        <text x="495" y="406" textAnchor="middle" fill={textFill('adas', t)} fontSize="6.5">Driver Assist</text>
      </g>

      {/* ═══════════ LEGEND ═══════════ */}
      <rect x="280" y="398" width="12" height="12" rx="3" fill={ACCENT} />
      <text x="296" y="409" fill="#475569" fontSize="9" fontWeight="500">Covered</text>
      <rect x="360" y="398" width="12" height="12" rx="3" fill={DIMMED} opacity="0.4" />
      <text x="376" y="409" fill="#94a3b8" fontSize="9" fontWeight="500">Not Covered</text>
    </svg>
  );
}
