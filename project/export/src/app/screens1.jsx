// Screens part 1: Home, Cases, Chat
const { useState, useEffect, useRef, useMemo } = React;

// ───────────────────────────────────────────────
// HOME SCREEN
// ───────────────────────────────────────────────
function HomeScreen({ lang, navigate, user }) {
  const t = T[lang];
  const { ANNOUNCEMENTS, POLLS, EVENTS, RESIDENTS, CASES } = window.DomeeioData;
  const hour = new Date().getHours();
  const greet = lang === 'mk'
    ? (hour < 11 ? 'Добро утро' : hour < 18 ? 'Добар ден' : 'Добра вечер')
    : (hour < 11 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening');

  const me = RESIDENTS.find(r => r.id === 'me');
  const activePolls = POLLS.filter(p => !p.closed);
  const myOpenCases = CASES.filter(c => c.reporter === 'me' && c.status !== 'resolved');
  const nextEvent = EVENTS[0];

  return (
    <div style={{ paddingBottom: 120 }}>
      {/* Header */}
      <div style={{
        padding: '8px 20px 20px',
        background: `linear-gradient(180deg, ${DOMEEIO_TOKENS.bgSubtle} 0%, ${DOMEEIO_TOKENS.bg} 100%)`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 13, color: DOMEEIO_TOKENS.inkSoft, fontWeight: 500 }}>
              {t.buildingName}
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: DOMEEIO_TOKENS.ink, letterSpacing: -0.5, marginTop: 2 }}>
              {greet},
            </div>
            <div style={{ fontSize: 24, fontWeight: 400, fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: DOMEEIO_TOKENS.primary, letterSpacing: -0.3, marginTop: -2 }}>
              {lang === 'mk' ? 'сосед' : 'neighbor'}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => navigate('notifications')} style={iconBtn()}>
              {Icon.bell(DOMEEIO_TOKENS.ink)}
              <span style={{
                position: 'absolute', top: 8, right: 8, width: 8, height: 8,
                background: DOMEEIO_TOKENS.danger, borderRadius: 8, border: '2px solid ' + DOMEEIO_TOKENS.bg,
              }} />
            </button>
            <button onClick={() => navigate('menu')} style={iconBtn()}>
              <Avatar user={me} size={32} />
            </button>
          </div>
        </div>

        {/* Quick stats strip */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 8 }}>
          <StatTile label={lang === 'mk' ? 'Мои случаи' : 'My cases'} value={myOpenCases.length} tone="primary" onClick={() => navigate('cases')} />
          <StatTile label={lang === 'mk' ? 'Гласања' : 'Polls'} value={activePolls.length} tone="sage" onClick={() => navigate('polls')} />
          <StatTile label={lang === 'mk' ? 'Неплатени' : 'Unpaid'} value={1} tone="amber" onClick={() => navigate('docs')} />
        </div>
      </div>

      {/* Announcements */}
      <div style={{ marginTop: 20 }}>
        <SectionHeader title={t.announcements} />
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ANNOUNCEMENTS.map(a => {
            const author = RESIDENTS.find(r => r.id === a.author);
            return (
              <Card key={a.id} padding={14}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <Avatar user={author} size={38} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2, flexWrap: 'nowrap' }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: DOMEEIO_TOKENS.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0, flexShrink: 1 }}>
                        {lang === 'mk' ? author.name : author.en}
                      </span>
                      {author.role === 'president' && <Chip tone="primary" size="xs">{t.president}</Chip>}
                      {a.pinned && <span style={{ color: DOMEEIO_TOKENS.amber, flexShrink: 0 }}>{Icon.pin(DOMEEIO_TOKENS.amber)}</span>}
                      <span style={{ fontSize: 11, color: DOMEEIO_TOKENS.inkMuted, marginLeft: 'auto', flexShrink: 0, whiteSpace: 'nowrap' }}>{a.time[lang]}</span>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: DOMEEIO_TOKENS.ink, lineHeight: 1.3, marginTop: 4 }}>
                      {a.title[lang]}
                    </div>
                    <div style={{ fontSize: 14, color: DOMEEIO_TOKENS.inkSoft, lineHeight: 1.45, marginTop: 4, textWrap: 'pretty' }}>
                      {a.body[lang]}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ marginTop: 24 }}>
        <SectionHeader title={t.quickActions} />
        <div style={{ padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <QuickAction icon={Icon.wrench('#fff')} label={t.reportIssue} bg={DOMEEIO_TOKENS.primary} onClick={() => navigate('newCase')} />
          <QuickAction icon={Icon.polls('#fff')} label={t.voteNow} bg={DOMEEIO_TOKENS.sage} onClick={() => navigate('polls')} count={activePolls.length} />
          <QuickAction icon={Icon.wrench('#fff')} label={lang === 'mk' ? 'Мајстор' : 'Craftsman'} bg={DOMEEIO_TOKENS.amber} onClick={() => navigate('craftsmen')} />
          <QuickAction icon={Icon.pdf('#fff')} label={t.bills} bg={DOMEEIO_TOKENS.sky} onClick={() => navigate('docs')} />
        </div>
      </div>

      {/* Next event */}
      <div style={{ marginTop: 24 }}>
        <SectionHeader title={t.upcoming} action={t.seeAll} onAction={() => navigate('calendar')} />
        <div style={{ padding: '0 20px' }}>
          <Card padding={0} onClick={() => navigate('calendar')}>
            <div style={{ display: 'flex', alignItems: 'stretch' }}>
              <div style={{
                width: 76, background: nextEvent.color,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                color: 'white', borderRadius: '18px 0 0 18px',
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, opacity: 0.85 }}>
                  {nextEvent.day}
                </div>
                <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1 }}>{nextEvent.date}</div>
              </div>
              <div style={{ flex: 1, padding: '16px 16px 16px 14px' }}>
                <Chip tone="primary" size="xs">{lang === 'mk' ? 'Одржување' : 'Maintenance'}</Chip>
                <div style={{ fontSize: 16, fontWeight: 600, color: DOMEEIO_TOKENS.ink, marginTop: 8 }}>
                  {nextEvent.title[lang]}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6, color: DOMEEIO_TOKENS.inkSoft, fontSize: 13 }}>
                  {Icon.clock(DOMEEIO_TOKENS.inkSoft)}
                  <span>{nextEvent.time}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatTile({ label, value, tone, onClick }) {
  const map = {
    primary: { bg: DOMEEIO_TOKENS.primarySoft, ink: DOMEEIO_TOKENS.primaryInk },
    sage: { bg: DOMEEIO_TOKENS.sageSoft, ink: DOMEEIO_TOKENS.sageInk },
    amber: { bg: DOMEEIO_TOKENS.amberSoft, ink: '#6e4a10' },
  };
  const c = map[tone];
  return (
    <button onClick={onClick} style={{
      background: c.bg, border: 'none', borderRadius: 14, padding: '12px 14px',
      textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
    }}>
      <div style={{ fontSize: 24, fontWeight: 700, color: c.ink, letterSpacing: -0.5, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, color: c.ink, opacity: 0.75, marginTop: 4, fontWeight: 500 }}>{label}</div>
    </button>
  );
}

function QuickAction({ icon, label, bg, onClick, count }) {
  return (
    <button onClick={onClick} style={{
      background: DOMEEIO_TOKENS.bgElevated,
      border: `1px solid ${DOMEEIO_TOKENS.border}`,
      borderRadius: 16, padding: 14, cursor: 'pointer', fontFamily: 'inherit',
      display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
      boxShadow: '0 1px 2px rgba(42,36,28,0.03), 0 4px 12px rgba(42,36,28,0.04)',
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: 12, background: bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, position: 'relative',
      }}>
        {icon}
        {count > 0 && (
          <div style={{
            position: 'absolute', top: -4, right: -4, minWidth: 18, height: 18,
            padding: '0 5px', background: DOMEEIO_TOKENS.ink, color: 'white',
            borderRadius: 18, fontSize: 11, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid ' + DOMEEIO_TOKENS.bgElevated,
          }}>{count}</div>
        )}
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: DOMEEIO_TOKENS.ink, lineHeight: 1.2 }}>{label}</div>
    </button>
  );
}

function iconBtn() {
  return {
    width: 40, height: 40, borderRadius: 20,
    background: DOMEEIO_TOKENS.bgElevated,
    border: `1px solid ${DOMEEIO_TOKENS.border}`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', position: 'relative',
    padding: 0, fontFamily: 'inherit',
  };
}

// ───────────────────────────────────────────────
// CASES SCREEN
// ───────────────────────────────────────────────
function CasesScreen({ lang, navigate }) {
  const t = T[lang];
  const { CASES, RESIDENTS } = window.DomeeioData;
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'mine' ? CASES.filter(c => c.reporter === 'me') : CASES;

  const statusTone = { open: 'rose', in_progress: 'amber', resolved: 'success' };
  const statusLabel = { open: t.open, in_progress: t.inProgress, resolved: t.resolved };
  const catIcon = {
    electrical: Icon.bolt, plumbing: Icon.drop, elevator: Icon.elevator, general: Icon.wrench,
  };

  return (
    <div style={{ paddingBottom: 120 }}>
      <ScreenHeader lang={lang} title={t.tabs.cases} />

      {/* Filter tabs */}
      <div style={{ padding: '0 20px 12px', display: 'flex', gap: 8 }}>
        {[
          { id: 'all', label: t.allCases },
          { id: 'mine', label: t.yourCases },
        ].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{
            padding: '8px 16px', borderRadius: 999,
            border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            fontSize: 13, fontWeight: 600,
            background: filter === f.id ? DOMEEIO_TOKENS.ink : DOMEEIO_TOKENS.bgElevated,
            color: filter === f.id ? 'white' : DOMEEIO_TOKENS.inkSoft,
            border: `1px solid ${filter === f.id ? DOMEEIO_TOKENS.ink : DOMEEIO_TOKENS.border}`,
          }}>{f.label}</button>
        ))}
      </div>

      {/* Cases list */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map(c => {
          const rep = RESIDENTS.find(r => r.id === c.reporter);
          const CatIconFn = catIcon[c.cat] || Icon.wrench;
          return (
            <Card key={c.id} padding={14} onClick={() => navigate('caseDetail', c.id)}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: DOMEEIO_TOKENS.bgSubtle,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {CatIconFn(DOMEEIO_TOKENS.primary)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <Chip tone={statusTone[c.status]} size="xs">{statusLabel[c.status]}</Chip>
                    {c.priority === 'high' && <Chip tone="danger" size="xs">{lang === 'mk' ? 'Итно' : 'Urgent'}</Chip>}
                    <span style={{ fontSize: 11, color: DOMEEIO_TOKENS.inkMuted, marginLeft: 'auto' }}>#{c.id.slice(1)} · {c.date}</span>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: DOMEEIO_TOKENS.ink, lineHeight: 1.3 }}>
                    {c.title[lang]}
                  </div>
                  <div style={{ fontSize: 12, color: DOMEEIO_TOKENS.inkSoft, marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Avatar user={rep} size={18} />
                    <span>{lang === 'mk' ? rep.name : rep.en}</span>
                    {c.assignee && <>
                      <span style={{ color: DOMEEIO_TOKENS.inkMuted }}>·</span>
                      <span>→ {c.assignee}</span>
                    </>}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────
// CASE DETAIL
// ───────────────────────────────────────────────
function CaseDetailScreen({ lang, navigate, caseId }) {
  const t = T[lang];
  const { CASES, RESIDENTS } = window.DomeeioData;
  const c = CASES.find(x => x.id === caseId);
  const rep = RESIDENTS.find(r => r.id === c.reporter);
  const statusTone = { open: 'rose', in_progress: 'amber', resolved: 'success' };
  const statusLabel = { open: t.open, in_progress: t.inProgress, resolved: t.resolved };

  const timeline = [
    { id: 1, type: 'reported', time: c.date + ' 14:22', user: rep },
    { id: 2, type: 'assigned', time: c.date + ' 16:05', user: RESIDENTS[0], meta: c.assignee },
    { id: 3, type: 'update', time: '22 Apr 09:15', user: RESIDENTS[0], text: { mk: 'Сервисерот потврди доаѓање утре во 10:00.', en: 'Technician confirmed arrival tomorrow at 10:00.' } },
  ].filter(it => c.status !== 'open' || it.type === 'reported');

  return (
    <div style={{ paddingBottom: 120 }}>
      <BackHeader lang={lang} onBack={() => navigate('cases')} title={`#${c.id.slice(1)}`} />

      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <Chip tone={statusTone[c.status]}>{statusLabel[c.status]}</Chip>
          {c.priority === 'high' && <Chip tone="danger">{lang === 'mk' ? 'Итно' : 'Urgent'}</Chip>}
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: DOMEEIO_TOKENS.ink, letterSpacing: -0.4, margin: 0, textWrap: 'balance' }}>
          {c.title[lang]}
        </h1>
        <div style={{ fontSize: 14, color: DOMEEIO_TOKENS.inkSoft, marginTop: 8, lineHeight: 1.5 }}>
          {lang === 'mk'
            ? 'Пријавено од жителите. Потребна е проверка и поправка.'
            : 'Reported by residents. Inspection and repair required.'}
        </div>

        {/* Photo placeholder */}
        <div style={{
          marginTop: 16, borderRadius: 14, overflow: 'hidden', height: 140,
          background: `repeating-linear-gradient(45deg, ${DOMEEIO_TOKENS.bgSubtle} 0 12px, #ede5d4 12px 24px)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: DOMEEIO_TOKENS.inkMuted, fontSize: 12, fontFamily: 'monospace', border: `1px solid ${DOMEEIO_TOKENS.border}`,
        }}>
          [case photo]
        </div>

        {/* Meta */}
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <MetaField label={t.reportedBy} value={lang === 'mk' ? rep.name : rep.en} />
          <MetaField label={t.assigned} value={c.assignee || (lang === 'mk' ? '—' : '—')} />
        </div>

        {/* Timeline */}
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: DOMEEIO_TOKENS.inkSoft, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 }}>
            {lang === 'mk' ? 'Активност' : 'Activity'}
          </div>
          {timeline.map((it, i) => (
            <div key={it.id} style={{ display: 'flex', gap: 12, paddingBottom: 16, position: 'relative' }}>
              {i < timeline.length - 1 && <div style={{ position: 'absolute', left: 13, top: 28, bottom: 4, width: 1.5, background: DOMEEIO_TOKENS.border }} />}
              <div style={{
                width: 28, height: 28, borderRadius: 28, background: DOMEEIO_TOKENS.sageSoft,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1,
              }}>
                {Icon.check(DOMEEIO_TOKENS.sageInk)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: DOMEEIO_TOKENS.ink }}>
                  {it.type === 'reported' && (lang === 'mk' ? 'Пријавен случај' : 'Case reported')}
                  {it.type === 'assigned' && (lang === 'mk' ? `Доделен на ${it.meta}` : `Assigned to ${it.meta}`)}
                  {it.type === 'update' && it.text[lang]}
                </div>
                <div style={{ fontSize: 12, color: DOMEEIO_TOKENS.inkMuted, marginTop: 2 }}>
                  {lang === 'mk' ? it.user.name : it.user.en} · {it.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetaField({ label, value }) {
  return (
    <div style={{
      background: DOMEEIO_TOKENS.bgElevated, border: `1px solid ${DOMEEIO_TOKENS.border}`,
      borderRadius: 12, padding: '10px 12px',
    }}>
      <div style={{ fontSize: 11, color: DOMEEIO_TOKENS.inkMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</div>
      <div style={{ fontSize: 14, color: DOMEEIO_TOKENS.ink, fontWeight: 500, marginTop: 3 }}>{value}</div>
    </div>
  );
}

// ───────────────────────────────────────────────
// NEW CASE
// ───────────────────────────────────────────────
function NewCaseScreen({ lang, navigate }) {
  const t = T[lang];
  const [cat, setCat] = useState('plumbing');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [loc, setLoc] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const cats = [
    { id: 'plumbing', label: lang === 'mk' ? 'Водовод' : 'Plumbing', icon: Icon.drop, color: DOMEEIO_TOKENS.sky },
    { id: 'electrical', label: lang === 'mk' ? 'Електрика' : 'Electrical', icon: Icon.bolt, color: DOMEEIO_TOKENS.amber },
    { id: 'elevator', label: lang === 'mk' ? 'Лифт' : 'Elevator', icon: Icon.elevator, color: DOMEEIO_TOKENS.primary },
    { id: 'general', label: lang === 'mk' ? 'Друго' : 'General', icon: Icon.wrench, color: DOMEEIO_TOKENS.sage },
  ];

  if (submitted) {
    return (
      <div style={{ padding: '60px 32px', textAlign: 'center' }}>
        <div style={{
          width: 76, height: 76, borderRadius: 76, background: DOMEEIO_TOKENS.sageSoft,
          margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4 10-10" stroke={DOMEEIO_TOKENS.sageInk} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: DOMEEIO_TOKENS.ink, margin: 0 }}>
          {lang === 'mk' ? 'Случајот е пријавен' : 'Case submitted'}
        </h2>
        <p style={{ fontSize: 14, color: DOMEEIO_TOKENS.inkSoft, marginTop: 12, lineHeight: 1.5 }}>
          {lang === 'mk'
            ? 'Претседателот ќе ја разгледа пријавата и ќе ја додели на соодветниот сервисер.'
            : 'The president will review and assign it to the right technician.'}
        </p>
        <button onClick={() => navigate('cases')} style={primaryBtn()}>
          {lang === 'mk' ? 'Види ги моите случаи' : 'View my cases'}
        </button>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: 120 }}>
      <BackHeader lang={lang} onBack={() => navigate('home')} title={t.newCase} />

      <div style={{ padding: '0 20px' }}>
        {/* Category picker */}
        <FieldLabel>{t.category}</FieldLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
          {cats.map(c => (
            <button key={c.id} onClick={() => setCat(c.id)} style={{
              padding: '14px 12px', borderRadius: 14,
              background: cat === c.id ? c.color : DOMEEIO_TOKENS.bgElevated,
              border: `1.5px solid ${cat === c.id ? c.color : DOMEEIO_TOKENS.border}`,
              display: 'flex', alignItems: 'center', gap: 10,
              cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
              color: cat === c.id ? 'white' : DOMEEIO_TOKENS.ink,
              fontSize: 14, fontWeight: 600,
              transition: 'all 0.15s',
            }}>
              {c.icon(cat === c.id ? '#fff' : c.color)}
              {c.label}
            </button>
          ))}
        </div>

        <FieldLabel>{lang === 'mk' ? 'Наслов' : 'Title'}</FieldLabel>
        <TextInput value={title} onChange={setTitle} placeholder={lang === 'mk' ? 'Краток опис…' : 'Short summary…'} />

        <FieldLabel>{t.location}</FieldLabel>
        <TextInput value={loc} onChange={setLoc} placeholder={lang === 'mk' ? 'Пр. ходник, кат 3' : 'e.g. hallway, floor 3'} />

        <FieldLabel>{t.description}</FieldLabel>
        <TextArea value={desc} onChange={setDesc} placeholder={lang === 'mk' ? 'Опиши го проблемот…' : 'Describe the problem…'} />

        {/* Photo */}
        <button style={{
          marginTop: 16, width: '100%', padding: 14, borderRadius: 14,
          background: DOMEEIO_TOKENS.bgElevated, border: `1.5px dashed ${DOMEEIO_TOKENS.borderStrong}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          cursor: 'pointer', fontFamily: 'inherit',
          fontSize: 14, fontWeight: 600, color: DOMEEIO_TOKENS.inkSoft,
        }}>
          {Icon.camera(DOMEEIO_TOKENS.inkSoft)}
          {t.attachPhoto}
        </button>

        <button onClick={() => setSubmitted(true)} style={primaryBtn({ marginTop: 24 })}>
          {t.submit}
        </button>
      </div>
    </div>
  );
}

function FieldLabel({ children }) {
  return <div style={{ fontSize: 12, fontWeight: 700, color: DOMEEIO_TOKENS.inkSoft, textTransform: 'uppercase', letterSpacing: 0.6, marginTop: 16, marginBottom: 8 }}>{children}</div>;
}

function TextInput({ value, onChange, placeholder }) {
  return (
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{
        width: '100%', padding: '12px 14px', borderRadius: 12, boxSizing: 'border-box',
        background: DOMEEIO_TOKENS.bgElevated, border: `1.5px solid ${DOMEEIO_TOKENS.border}`,
        fontSize: 15, color: DOMEEIO_TOKENS.ink, fontFamily: 'inherit', outline: 'none',
      }} />
  );
}
function TextArea({ value, onChange, placeholder }) {
  return (
    <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={4}
      style={{
        width: '100%', padding: '12px 14px', borderRadius: 12, boxSizing: 'border-box',
        background: DOMEEIO_TOKENS.bgElevated, border: `1.5px solid ${DOMEEIO_TOKENS.border}`,
        fontSize: 15, color: DOMEEIO_TOKENS.ink, fontFamily: 'inherit', outline: 'none',
        resize: 'none',
      }} />
  );
}

function primaryBtn(extra = {}) {
  return {
    width: '100%', padding: '14px 16px', borderRadius: 14,
    background: DOMEEIO_TOKENS.primary, color: 'white', border: 'none',
    fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
    boxShadow: '0 2px 6px rgba(201,122,95,0.3)',
    ...extra,
  };
}

// ───────────────────────────────────────────────
// CHAT
// ───────────────────────────────────────────────
function ChatScreen({ lang, navigate }) {
  const t = T[lang];
  const { CHAT, RESIDENTS } = window.DomeeioData;
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState(CHAT);

  const send = () => {
    if (!input.trim()) return;
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    setMsgs([...msgs, { id: 'm' + Date.now(), user: 'me', text: { mk: input, en: input }, time: `${hh}:${mm}` }]);
    setInput('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ScreenHeader lang={lang} title={t.generalChat} subtitle={`400 ${lang === 'mk' ? 'членови' : 'members'} · 12 ${lang === 'mk' ? 'онлајн' : 'online'}`} />

      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 16px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ textAlign: 'center', padding: '12px 0 20px', fontSize: 11, color: DOMEEIO_TOKENS.inkMuted, fontWeight: 600, letterSpacing: 0.5 }}>
          {lang === 'mk' ? 'ДЕНЕС' : 'TODAY'}
        </div>
        {msgs.map((m, i) => {
          const u = RESIDENTS.find(r => r.id === m.user);
          const isMe = m.user === 'me';
          const prev = msgs[i - 1];
          const showAvatar = !prev || prev.user !== m.user;
          return (
            <div key={m.id} style={{
              display: 'flex', gap: 8, alignItems: 'flex-end',
              flexDirection: isMe ? 'row-reverse' : 'row',
              marginTop: showAvatar ? 8 : 0,
            }}>
              <div style={{ width: 28, flexShrink: 0 }}>
                {showAvatar && !isMe && <Avatar user={u} size={28} />}
              </div>
              <div style={{ maxWidth: '72%' }}>
                {showAvatar && !isMe && (
                  <div style={{ fontSize: 11, color: DOMEEIO_TOKENS.inkMuted, fontWeight: 600, marginBottom: 3, marginLeft: 12, display: 'flex', gap: 4, alignItems: 'center' }}>
                    <span>{lang === 'mk' ? u.name : u.en}</span>
                    {m.badge === 'president' && <Chip tone="primary" size="xs">{t.president}</Chip>}
                  </div>
                )}
                <div style={{
                  padding: '9px 13px', borderRadius: 18,
                  background: isMe ? DOMEEIO_TOKENS.primary : DOMEEIO_TOKENS.bgElevated,
                  color: isMe ? 'white' : DOMEEIO_TOKENS.ink,
                  border: isMe ? 'none' : `1px solid ${DOMEEIO_TOKENS.border}`,
                  fontSize: 14.5, lineHeight: 1.4,
                  borderBottomRightRadius: isMe ? 6 : 18,
                  borderBottomLeftRadius: !isMe ? 6 : 18,
                  boxShadow: isMe ? '0 1px 2px rgba(201,122,95,0.25)' : '0 1px 2px rgba(42,36,28,0.03)',
                }}>
                  {m.text[lang]}
                </div>
                <div style={{ fontSize: 10, color: DOMEEIO_TOKENS.inkMuted, marginTop: 2, marginLeft: isMe ? 0 : 12, marginRight: isMe ? 12 : 0, textAlign: isMe ? 'right' : 'left' }}>
                  {m.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Composer */}
      <div style={{
        padding: '10px 14px', paddingBottom: 100,
        borderTop: `1px solid ${DOMEEIO_TOKENS.border}`,
        background: DOMEEIO_TOKENS.bg,
        display: 'flex', gap: 8, alignItems: 'flex-end',
      }}>
        <div style={{
          flex: 1, background: DOMEEIO_TOKENS.bgElevated,
          border: `1px solid ${DOMEEIO_TOKENS.border}`, borderRadius: 22,
          padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder={t.message}
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: 15, background: 'none', fontFamily: 'inherit', color: DOMEEIO_TOKENS.ink }} />
        </div>
        <button onClick={send} style={{
          width: 44, height: 44, borderRadius: 22,
          background: input.trim() ? DOMEEIO_TOKENS.primary : DOMEEIO_TOKENS.bgSubtle,
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.15s',
        }}>
          {Icon.send(input.trim() ? '#fff' : DOMEEIO_TOKENS.inkMuted)}
        </button>
      </div>
    </div>
  );
}

// Shared headers
function ScreenHeader({ lang, title, subtitle }) {
  return (
    <div style={{ padding: '8px 20px 14px' }}>
      <div style={{ fontSize: 28, fontWeight: 700, color: DOMEEIO_TOKENS.ink, letterSpacing: -0.6 }}>{title}</div>
      {subtitle && <div style={{ fontSize: 13, color: DOMEEIO_TOKENS.inkSoft, marginTop: 2 }}>{subtitle}</div>}
    </div>
  );
}
function BackHeader({ lang, onBack, title }) {
  const t = T[lang];
  return (
    <div style={{ padding: '4px 12px 14px', display: 'flex', alignItems: 'center', gap: 4 }}>
      <button onClick={onBack} style={{
        padding: 8, background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'inherit',
        color: DOMEEIO_TOKENS.primary, fontSize: 15, fontWeight: 500,
      }}>
        {Icon.back(DOMEEIO_TOKENS.primary)}
        {t.back}
      </button>
      {title && <div style={{ marginLeft: 'auto', marginRight: 12, fontSize: 13, color: DOMEEIO_TOKENS.inkMuted, fontFamily: 'monospace' }}>{title}</div>}
    </div>
  );
}

Object.assign(window, {
  HomeScreen, CasesScreen, CaseDetailScreen, NewCaseScreen, ChatScreen,
  ScreenHeader, BackHeader, FieldLabel, TextInput, TextArea,
  primaryBtn, iconBtn,
});
