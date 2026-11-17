// Generates a product illustration as inline SVG: no image files to download, always crisp,
// and nothing that can fail to load. Swap for real <img> photos later if you have them.
const SHAPES = {
  vase: (a, b) => <><path d="M82 52h36l-6 22c24 14 30 40 22 66-4 12-14 18-34 18s-30-6-34-18c-8-26-2-52 22-66z" fill={a} /><ellipse cx="100" cy="52" rx="18" ry="5" fill={b} /><path d="M72 112q28 14 56 0" stroke={b} strokeWidth="5" fill="none" /></>,
  mug: (a, b) => <><rect x="62" y="64" width="72" height="84" rx="14" fill={a} /><path d="M134 80h12q16 0 16 22t-16 22h-12" stroke={a} strokeWidth="10" fill="none" /><rect x="62" y="64" width="72" height="14" rx="7" fill={b} /></>,
  bowl: (a, b) => <><path d="M44 92h112q0 56-56 56T44 92z" fill={a} /><ellipse cx="100" cy="92" rx="56" ry="9" fill={b} /></>,
  cushion: (a, b) => <><rect x="48" y="56" width="104" height="96" rx="22" fill={a} /><path d="M70 80l16 16-16 16m36-32l16 16-16 16m36-32l16 16" stroke={b} strokeWidth="5" fill="none" strokeLinecap="round" transform="translate(-20 6)" /></>,
  throw: (a, b) => <><rect x="44" y="52" width="112" height="100" rx="6" fill={a} />{[70, 94, 118].map((y) => <rect key={y} x="44" y={y} width="112" height="12" fill={b} />)}</>,
  tote: (a, b) => <><path d="M72 76q0-32 28-32t28 32" stroke={b} strokeWidth="8" fill="none" /><path d="M56 76h88l8 76H48z" fill={a} /><rect x="80" y="104" width="40" height="26" rx="4" fill={b} opacity=".5" /></>,
  lamp: (a, b) => <><path d="M72 44h56l16 56H56z" fill={a} /><rect x="96" y="100" width="8" height="40" fill={b} /><ellipse cx="100" cy="146" rx="28" ry="8" fill={b} /></>,
  jar: (a, b) => <><rect x="58" y="76" width="84" height="72" rx="12" fill={b} /><rect x="64" y="84" width="72" height="56" rx="8" fill={a} opacity=".7" /><path d="M100 40q12 14 0 28q-12-14 0-28z" fill="#F5C04A" /></>,
  mirror: (a, b) => <><path d="M54 152V84q0-40 46-40t46 40v68z" fill={a} /><path d="M66 146V86q0-30 34-30t34 30v60z" fill={b} /><path d="M78 100l22-22" stroke="#fff" strokeWidth="5" opacity=".6" strokeLinecap="round" /></>,
};

export default function ProductArt({ product, className = '' }) {
  const [a, b] = product.colors;
  const id = 'g-' + product.id;
  return (
    <svg className={'art ' + className} viewBox="0 0 200 200" role="img" aria-label={`Illustration of ${product.name}`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} stopOpacity=".28" /><stop offset="1" stopColor={b} stopOpacity=".18" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="#F9E3EA" /><rect width="200" height="200" fill={`url(#${id})`} />
      <circle cx="152" cy="44" r="22" fill={a} opacity=".25" />
      <ellipse cx="100" cy="158" rx="52" ry="7" fill="#000" opacity=".12" />
      {SHAPES[product.shape](a, b)}
    </svg>
  );
}
