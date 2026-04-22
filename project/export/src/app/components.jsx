// Design tokens + shared primitives for Domeeio
const DOMEEIO_TOKENS = {
  // Warm neutrals
  bg: '#faf7f2',
  bgElevated: '#ffffff',
  bgSubtle: '#f3ede4',
  border: '#ece4d6',
  borderStrong: '#ddd1bd',
  // Text
  ink: '#2a241c',
  inkSoft: '#615649',
  inkMuted: '#9a8d7c',
  // Primary — warm terracotta
  primary: '#c97a5f',
  primaryHover: '#b8684d',
  primarySoft: '#f5e3db',
  primaryInk: '#7a3820',
  // Sage secondary
  sage: '#7a9a6e',
  sageSoft: '#e3ede0',
  sageInk: '#3f5a35',
  // Warm accents
  amber: '#b88a4a',
  amberSoft: '#f2e7d1',
  sky: '#6e8ba0',
  skySoft: '#dde6ed',
  rose: '#c97889',
  roseSoft: '#f5dde2',
  // Status
  danger: '#b8503c',
  dangerSoft: '#f5dcd4',
  success: '#5a7a4e',
  successSoft: '#dfe9d7',
  warn: '#b88030',
  warnSoft: '#f2e3c8',
};

// ─── Avatar ───
function Avatar({ user, size = 36 }) {
  const bg = user?.color || '#9a8d7c';
  const initials = user?.avatar || '?';
  return (
    <div style={{
      width: size, height: size, borderRadius: size,
      background: bg, color: 'white',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.38, fontWeight: 600, letterSpacing: 0.2,
      flexShrink: 0,
      boxShadow: 'inset 0 -1px 2px rgba(0,0,0,0.08)',
    }}>
      {initials}
    </div>
  );
}

// ─── Chip / Badge ───
function Chip({ children, tone = 'neutral', size = 'sm' }) {
  const tones = {
    neutral: { bg: '#f0e9dc', color: '#615649' },
    primary: { bg: DOMEEIO_TOKENS.primarySoft, color: DOMEEIO_TOKENS.primaryInk },
    sage: { bg: DOMEEIO_TOKENS.sageSoft, color: DOMEEIO_TOKENS.sageInk },
    amber: { bg: DOMEEIO_TOKENS.amberSoft, color: '#7a5420' },
    sky: { bg: DOMEEIO_TOKENS.skySoft, color: '#3e5668' },
    rose: { bg: DOMEEIO_TOKENS.roseSoft, color: '#823a48' },
    danger: { bg: DOMEEIO_TOKENS.dangerSoft, color: '#7a2e1e' },
    success: { bg: DOMEEIO_TOKENS.successSoft, color: '#355028' },
    warn: { bg: DOMEEIO_TOKENS.warnSoft, color: '#6e4a10' },
  };
  const t = tones[tone] || tones.neutral;
  const pad = size === 'xs' ? '2px 8px' : '4px 10px';
  const fs = size === 'xs' ? 11 : 12;
  return (
    <span style={{
      padding: pad, borderRadius: 999,
      background: t.bg, color: t.color,
      fontSize: fs, fontWeight: 600,
      display: 'inline-flex', alignItems: 'center', gap: 4,
      whiteSpace: 'nowrap',
    }}>{children}</span>
  );
}

// ─── Card ───
function Card({ children, style = {}, onClick, padding = 16 }) {
  return (
    <div onClick={onClick} style={{
      background: DOMEEIO_TOKENS.bgElevated,
      borderRadius: 18, padding,
      border: `1px solid ${DOMEEIO_TOKENS.border}`,
      boxShadow: '0 1px 2px rgba(42,36,28,0.03), 0 4px 12px rgba(42,36,28,0.04)',
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    }}>{children}</div>
  );
}

// ─── Section header ───
function SectionHeader({ title, action, onAction }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '0 20px', marginBottom: 10 }}>
      <h3 style={{
        fontSize: 17, fontWeight: 700, color: DOMEEIO_TOKENS.ink,
        margin: 0, letterSpacing: -0.2,
      }}>{title}</h3>
      {action && (
        <button onClick={onAction} style={{
          border: 'none', background: 'none', padding: 0,
          fontSize: 14, fontWeight: 600, color: DOMEEIO_TOKENS.primary, cursor: 'pointer',
          fontFamily: 'inherit',
        }}>{action}</button>
      )}
    </div>
  );
}

// ─── Icons (minimal line set, 24px) ───
const Icon = {
  home: (c = 'currentColor') => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1V10.5z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  cases: (c = 'currentColor') => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="14" rx="2.5" stroke={c} strokeWidth="1.8"/><path d="M8 6V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" stroke={c} strokeWidth="1.8"/><path d="M3 12h18" stroke={c} strokeWidth="1.8"/></svg>,
  chat: (c = 'currentColor') => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21 12c0 4.4-4 8-9 8-1.3 0-2.5-.2-3.6-.6L3 21l1.3-4.2C3.5 15.4 3 13.7 3 12c0-4.4 4-8 9-8s9 3.6 9 8z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  polls: (c = 'currentColor') => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M6 20V10M12 20V4M18 20v-7" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>,
  calendar: (c = 'currentColor') => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="2.5" stroke={c} strokeWidth="1.8"/><path d="M3 10h18M8 3v4M16 3v4" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>,
  docs: (c = 'currentColor') => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/><path d="M14 3v6h6M8 14h8M8 18h5" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>,
  plus: (c = 'currentColor') => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke={c} strokeWidth="2.2" strokeLinecap="round"/></svg>,
  back: (c = 'currentColor') => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  bell: (c = 'currentColor') => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2.5h-15L6 16zM10 19a2 2 0 0 0 4 0" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  more: (c = 'currentColor') => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="1.6" fill={c}/><circle cx="12" cy="12" r="1.6" fill={c}/><circle cx="19" cy="12" r="1.6" fill={c}/></svg>,
  pin: (c = 'currentColor') => <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 17v5M9 3h6l-1 5 3 3H7l3-3-1-5z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  send: (c = 'currentColor') => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 12l18-9-6 18-3-8-9-1z" stroke={c} strokeWidth="1.8" strokeLinejoin="round" fill={c === '#fff' ? 'none' : 'none'}/></svg>,
  camera: (c = 'currentColor') => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="7" width="18" height="13" rx="2.5" stroke={c} strokeWidth="1.8"/><circle cx="12" cy="13.5" r="3.5" stroke={c} strokeWidth="1.8"/><path d="M8 7l1.5-3h5L16 7" stroke={c} strokeWidth="1.8"/></svg>,
  check: (c = 'currentColor') => <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4 10-10" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  bolt: (c = 'currentColor') => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  drop: (c = 'currentColor') => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3c3 4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-7 6-11z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  elevator: (c = 'currentColor') => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="1.5" stroke={c} strokeWidth="1.8"/><path d="M12 3v18M9 9l-1.5 2h3L9 9zM15 15l1.5-2h-3L15 15z" stroke={c} strokeWidth="1.8" strokeLinejoin="round" fill={c}/></svg>,
  wrench: (c = 'currentColor') => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M14 6a4 4 0 0 1 5 5l-8 8-4 1 1-4 6-6-1-2 1-2z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  pdf: (c = 'currentColor') => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/><text x="8" y="17" fontSize="6" fontWeight="700" fill={c}>PDF</text></svg>,
  gavel: (c = 'currentColor') => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M13 3l8 8-3 3-8-8 3-3zM10 6L3 13l3 3 7-7M4 21h12" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  clock: (c = 'currentColor') => <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.8"/><path d="M12 7v5l3 2" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>,
  menu: (c = 'currentColor') => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>,
  globe: (c = 'currentColor') => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.8"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" stroke={c} strokeWidth="1.8"/></svg>,
};

Object.assign(window, {
  DOMEEIO_TOKENS, Avatar, Chip, Card, SectionHeader, Icon,
});
