// Screens part 2: Polls, Calendar, Docs, Menu/Directory
const { useState: useState2 } = React;

// ───────────────────────────────────────────────
// POLLS SCREEN
// ───────────────────────────────────────────────
function PollsScreen({ lang, navigate, votes, setVotes }) {
  const t = T[lang];
  const { POLLS } = window.DomeeioData;

  return (
    <div style={{ paddingBottom: 120 }}>
      <ScreenHeader lang={lang} title={t.tabs.polls} subtitle={lang === 'mk' ? `${POLLS.filter(p => !p.closed).length} активни · ${POLLS.filter(p => p.closed).length} завршени` : `${POLLS.filter(p => !p.closed).length} active · ${POLLS.filter(p => p.closed).length} closed`} />

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {POLLS.map(p => (
          <PollCard key={p.id} poll={p} lang={lang} myVote={votes[p.id]} onOpen={() => navigate('pollDetail', p.id)} />
        ))}
      </div>
    </div>
  );
}

function PollCard({ poll, lang, myVote, onOpen }) {
  const t = T[lang];
  const maxVotes = Math.max(...poll.options.map(o => o.votes));
  const closed = poll.closed;
  return (
    <Card padding={0} onClick={onOpen}>
      <div style={{ padding: '16px 16px 12px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          {closed ? <Chip tone="neutral" size="xs">{lang === 'mk' ? 'Завршено' : 'Closed'}</Chip> : <Chip tone="sage" size="xs">{lang === 'mk' ? 'Активно' : 'Active'}</Chip>}
          {(myVote || poll.voted) && <Chip tone="primary" size="xs">✓ {t.youVoted}</Chip>}
          <span style={{ fontSize: 11, color: DOMEEIO_TOKENS.inkMuted, marginLeft: 'auto', fontWeight: 500 }}>{poll.deadline[lang]}</span>
        </div>
        <div style={{ fontSize: 17, fontWeight: 700, color: DOMEEIO_TOKENS.ink, lineHeight: 1.3, letterSpacing: -0.2 }}>
          {poll.title[lang]}
        </div>
        <div style={{ fontSize: 13, color: DOMEEIO_TOKENS.inkSoft, marginTop: 6, lineHeight: 1.45 }}>
          {poll.desc[lang]}
        </div>
      </div>

      <div style={{ padding: '0 16px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {poll.options.map(opt => {
          const pct = Math.round((opt.votes / poll.total) * 100);
          const isWinner = closed && opt.votes === maxVotes;
          const userVoted = myVote === opt.id || poll.voted === opt.id;
          return (
            <div key={opt.id} style={{
              position: 'relative', overflow: 'hidden', borderRadius: 10,
              border: `1px solid ${userVoted ? DOMEEIO_TOKENS.primary : DOMEEIO_TOKENS.border}`,
              background: DOMEEIO_TOKENS.bgSubtle,
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, bottom: 0, width: `${pct}%`,
                background: isWinner ? DOMEEIO_TOKENS.sageSoft : (userVoted ? DOMEEIO_TOKENS.primarySoft : '#ebe3d3'),
                transition: 'width 0.4s',
              }} />
              <div style={{ position: 'relative', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: 1, fontSize: 13.5, fontWeight: userVoted || isWinner ? 700 : 500, color: DOMEEIO_TOKENS.ink }}>
                  {opt.label[lang]}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: DOMEEIO_TOKENS.inkSoft, fontVariantNumeric: 'tabular-nums' }}>{pct}%</div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        padding: '10px 16px', borderTop: `1px solid ${DOMEEIO_TOKENS.border}`,
        display: 'flex', alignItems: 'center', gap: 10,
        fontSize: 12, color: DOMEEIO_TOKENS.inkSoft,
      }}>
        <div style={{ flex: 1 }}>
          {t.participation}: <strong style={{ color: DOMEEIO_TOKENS.ink }}>{poll.participation}%</strong>
          <span style={{ color: DOMEEIO_TOKENS.inkMuted }}> · {poll.options.reduce((s, o) => s + o.votes, 0)} / {poll.total}</span>
        </div>
        {!closed && !myVote && !poll.voted && (
          <span style={{ color: DOMEEIO_TOKENS.primary, fontWeight: 700, fontSize: 13 }}>
            {t.voteNow} →
          </span>
        )}
      </div>
    </Card>
  );
}

// ───────────────────────────────────────────────
// POLL DETAIL (voting flow)
// ───────────────────────────────────────────────
function PollDetailScreen({ lang, navigate, pollId, votes, setVotes }) {
  const t = T[lang];
  const { POLLS } = window.DomeeioData;
  const p = POLLS.find(x => x.id === pollId);
  const [selected, setSelected] = useState2(votes[pollId] || p.voted || null);
  const [just, setJust] = useState2(false);

  const closed = p.closed;
  const myVote = votes[pollId] || p.voted;

  const cast = () => {
    if (!selected || myVote) return;
    setVotes({ ...votes, [pollId]: selected });
    setJust(true);
    setTimeout(() => setJust(false), 1600);
  };

  return (
    <div style={{ paddingBottom: 140 }}>
      <BackHeader lang={lang} onBack={() => navigate('polls')} />
      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          {closed ? <Chip tone="neutral">{lang === 'mk' ? 'Завршено' : 'Closed'}</Chip> : <Chip tone="sage">{lang === 'mk' ? 'Активно' : 'Active'}</Chip>}
          <Chip tone="neutral">{p.deadline[lang]}</Chip>
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: DOMEEIO_TOKENS.ink, letterSpacing: -0.4, margin: 0, textWrap: 'balance', lineHeight: 1.2 }}>
          {p.title[lang]}
        </h1>
        <p style={{ fontSize: 14.5, color: DOMEEIO_TOKENS.inkSoft, marginTop: 10, lineHeight: 1.5 }}>
          {p.desc[lang]}
        </p>

        {/* Participation bar */}
        <div style={{ marginTop: 16, padding: 14, borderRadius: 14, background: DOMEEIO_TOKENS.bgElevated, border: `1px solid ${DOMEEIO_TOKENS.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: DOMEEIO_TOKENS.inkSoft, fontWeight: 600 }}>
            <span>{t.participation}</span>
            <span style={{ color: DOMEEIO_TOKENS.ink, fontVariantNumeric: 'tabular-nums' }}>{p.participation}% · {p.options.reduce((s, o) => s + o.votes, 0)}/{p.total}</span>
          </div>
          <div style={{ height: 6, borderRadius: 6, background: DOMEEIO_TOKENS.bgSubtle, marginTop: 8, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${p.participation}%`, background: DOMEEIO_TOKENS.sage, borderRadius: 6 }} />
          </div>
        </div>

        {/* Options */}
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {p.options.map(opt => {
            const pct = Math.round((opt.votes / p.total) * 100);
            const isSel = selected === opt.id;
            const isMy = myVote === opt.id;
            return (
              <button key={opt.id} onClick={() => !myVote && !closed && setSelected(opt.id)} style={{
                position: 'relative', overflow: 'hidden',
                borderRadius: 14, padding: 0, cursor: myVote || closed ? 'default' : 'pointer',
                border: `2px solid ${isSel || isMy ? DOMEEIO_TOKENS.primary : DOMEEIO_TOKENS.border}`,
                background: DOMEEIO_TOKENS.bgElevated, fontFamily: 'inherit', textAlign: 'left',
                transition: 'all 0.15s',
              }}>
                {(myVote || closed) && (
                  <div style={{
                    position: 'absolute', top: 0, left: 0, bottom: 0, width: `${pct}%`,
                    background: isMy ? DOMEEIO_TOKENS.primarySoft : DOMEEIO_TOKENS.bgSubtle,
                  }} />
                )}
                <div style={{ position: 'relative', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: 22,
                    border: `2px solid ${isSel || isMy ? DOMEEIO_TOKENS.primary : DOMEEIO_TOKENS.borderStrong}`,
                    background: isSel || isMy ? DOMEEIO_TOKENS.primary : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    {(isSel || isMy) && <div style={{ width: 8, height: 8, borderRadius: 8, background: 'white' }} />}
                  </div>
                  <div style={{ flex: 1, fontSize: 15, fontWeight: 600, color: DOMEEIO_TOKENS.ink }}>
                    {opt.label[lang]}
                  </div>
                  {(myVote || closed) && (
                    <div style={{ fontSize: 14, fontWeight: 700, color: DOMEEIO_TOKENS.ink, fontVariantNumeric: 'tabular-nums' }}>
                      {pct}%
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {!myVote && !closed && (
          <button onClick={cast} disabled={!selected} style={{
            ...primaryBtn({ marginTop: 20 }),
            opacity: selected ? 1 : 0.4,
          }}>
            {t.castVote}
          </button>
        )}
        {myVote && !closed && (
          <div style={{
            marginTop: 20, padding: '14px 16px', borderRadius: 14,
            background: DOMEEIO_TOKENS.sageSoft, color: DOMEEIO_TOKENS.sageInk,
            display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 600,
          }}>
            {Icon.check(DOMEEIO_TOKENS.sageInk)}
            {lang === 'mk' ? 'Твојот глас е запишан. Можеш да го смениш додека гласањето е отворено.' : 'Your vote is recorded. You can change it while voting is open.'}
          </div>
        )}
      </div>

      {just && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          background: 'rgba(42,36,28,0.92)', color: 'white',
          padding: '14px 22px', borderRadius: 14, fontSize: 14, fontWeight: 600,
          backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', gap: 8, zIndex: 50,
        }}>
          {Icon.check('#fff')}
          {lang === 'mk' ? 'Гласот е запишан' : 'Vote recorded'}
        </div>
      )}
    </div>
  );
}

// ───────────────────────────────────────────────
// CALENDAR
// ───────────────────────────────────────────────
function CalendarScreen({ lang }) {
  const t = T[lang];
  const { EVENTS } = window.DomeeioData;
  const [selDate, setSelDate] = useState2(23);

  const monthName = lang === 'mk' ? 'Април 2026' : 'April 2026';
  const weekdays = lang === 'mk' ? ['П', 'В', 'С', 'Ч', 'П', 'С', 'Н'] : ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  // Simple grid: start from a Monday in April 2026
  const days = [];
  // April 1 2026 is a Wednesday → pad 2 days
  for (let i = 0; i < 2; i++) days.push(null);
  for (let i = 1; i <= 30; i++) days.push(i);

  const eventsByDate = { 23: EVENTS[0], 25: EVENTS[1], 27: EVENTS[2], 29: EVENTS[3] };

  const selectedEvents = EVENTS.filter(e => parseInt(e.date) === selDate || (selDate === 23 && e.id === 'e1'));

  return (
    <div style={{ paddingBottom: 120 }}>
      <ScreenHeader lang={lang} title={t.tabs.calendar} />

      <div style={{ padding: '0 20px' }}>
        <Card padding={18}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: DOMEEIO_TOKENS.ink }}>{monthName}</div>
            <div style={{ display: 'flex', gap: 4 }}>
              <button style={calNavBtn}>‹</button>
              <button style={calNavBtn}>›</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 6 }}>
            {weekdays.map((w, i) => (
              <div key={i} style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, color: DOMEEIO_TOKENS.inkMuted }}>{w}</div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
            {days.map((d, i) => {
              if (d === null) return <div key={i} />;
              const hasEvt = eventsByDate[d];
              const isSel = d === selDate;
              const isToday = d === 22;
              return (
                <button key={i} onClick={() => setSelDate(d)} style={{
                  aspectRatio: '1', borderRadius: 10, border: 'none',
                  background: isSel ? DOMEEIO_TOKENS.primary : (isToday ? DOMEEIO_TOKENS.primarySoft : 'transparent'),
                  color: isSel ? 'white' : DOMEEIO_TOKENS.ink,
                  fontSize: 14, fontWeight: isSel || isToday ? 700 : 500,
                  cursor: 'pointer', fontFamily: 'inherit',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  position: 'relative',
                }}>
                  {d}
                  {hasEvt && <div style={{
                    width: 4, height: 4, borderRadius: 4, marginTop: 2,
                    background: isSel ? 'white' : hasEvt.color,
                  }} />}
                </button>
              );
            })}
          </div>
        </Card>

        <div style={{ fontSize: 13, fontWeight: 700, color: DOMEEIO_TOKENS.inkSoft, textTransform: 'uppercase', letterSpacing: 0.8, marginTop: 22, marginBottom: 10 }}>
          {lang === 'mk' ? 'Настани во овој месец' : 'Events this month'}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {EVENTS.map(e => (
            <Card key={e.id} padding={0}>
              <div style={{ display: 'flex', alignItems: 'stretch' }}>
                <div style={{
                  width: 60, background: e.color, color: 'white',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '18px 0 0 18px',
                }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', opacity: 0.9 }}>{e.day}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1 }}>{e.date}</div>
                </div>
                <div style={{ flex: 1, padding: '12px 14px' }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: DOMEEIO_TOKENS.ink, lineHeight: 1.25 }}>{e.title[lang]}</div>
                  <div style={{ fontSize: 12.5, color: DOMEEIO_TOKENS.inkSoft, marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                    {Icon.clock(DOMEEIO_TOKENS.inkSoft)}
                    <span>{e.time}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

const calNavBtn = {
  width: 28, height: 28, borderRadius: 8, border: 'none',
  background: DOMEEIO_TOKENS.bgSubtle, cursor: 'pointer',
  fontSize: 16, fontWeight: 600, color: DOMEEIO_TOKENS.inkSoft,
  fontFamily: 'inherit',
};

// ───────────────────────────────────────────────
// DOCUMENTS
// ───────────────────────────────────────────────
function DocsScreen({ lang }) {
  const t = T[lang];
  const { DOCS } = window.DomeeioData;
  const [tab, setTab] = useState2('all');

  const groups = {
    all: DOCS,
    bills: DOCS.filter(d => d.type === 'bill'),
    minutes: DOCS.filter(d => d.type === 'minutes'),
    docs: DOCS.filter(d => d.type === 'doc'),
  };
  const items = groups[tab];

  const unpaid = DOCS.find(d => d.type === 'bill' && d.status === 'unpaid');

  return (
    <div style={{ paddingBottom: 120 }}>
      <ScreenHeader lang={lang} title={t.tabs.docs} />

      {/* Featured unpaid bill banner */}
      {unpaid && (
        <div style={{ padding: '0 20px 16px' }}>
          <div style={{
            padding: 16, borderRadius: 16,
            background: `linear-gradient(135deg, ${DOMEEIO_TOKENS.primary}, ${DOMEEIO_TOKENS.amber})`,
            color: 'white',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, opacity: 0.9 }}>
              {lang === 'mk' ? 'Неплатена сметка' : 'Unpaid bill'}
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, marginTop: 6 }}>{unpaid.title[lang]}</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 14 }}>
              <div>
                <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, fontVariantNumeric: 'tabular-nums' }}>
                  {unpaid.amount}
                </div>
                <div style={{ fontSize: 12, opacity: 0.9, marginTop: 2 }}>{t.due} {unpaid.due}</div>
              </div>
              <button style={{
                padding: '10px 16px', borderRadius: 12,
                background: 'white', color: DOMEEIO_TOKENS.primaryInk,
                border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
              }}>
                {lang === 'mk' ? 'Преземи PDF' : 'Download PDF'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter tabs */}
      <div style={{ padding: '0 20px 12px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {[
          { id: 'all', label: lang === 'mk' ? 'Сите' : 'All' },
          { id: 'bills', label: t.bills },
          { id: 'minutes', label: t.minutes },
          { id: 'docs', label: t.documents },
        ].map(f => (
          <button key={f.id} onClick={() => setTab(f.id)} style={{
            padding: '7px 14px', borderRadius: 999,
            border: `1px solid ${tab === f.id ? DOMEEIO_TOKENS.ink : DOMEEIO_TOKENS.border}`,
            background: tab === f.id ? DOMEEIO_TOKENS.ink : DOMEEIO_TOKENS.bgElevated,
            color: tab === f.id ? 'white' : DOMEEIO_TOKENS.inkSoft,
            fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
          }}>{f.label}</button>
        ))}
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map(d => (
          <Card key={d.id} padding={14}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 44, height: 56, borderRadius: 8,
                background: d.type === 'bill' ? DOMEEIO_TOKENS.primarySoft : (d.type === 'minutes' ? DOMEEIO_TOKENS.sageSoft : DOMEEIO_TOKENS.skySoft),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, position: 'relative',
              }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: d.type === 'bill' ? DOMEEIO_TOKENS.primaryInk : (d.type === 'minutes' ? DOMEEIO_TOKENS.sageInk : '#3e5668'), letterSpacing: 0.5 }}>PDF</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14.5, fontWeight: 600, color: DOMEEIO_TOKENS.ink, lineHeight: 1.3 }}>
                  {d.title[lang]}
                </div>
                <div style={{ fontSize: 12, color: DOMEEIO_TOKENS.inkMuted, marginTop: 4, display: 'flex', gap: 6, alignItems: 'center' }}>
                  {d.amount && <strong style={{ color: DOMEEIO_TOKENS.ink, fontVariantNumeric: 'tabular-nums' }}>{d.amount}</strong>}
                  {d.amount && <span>·</span>}
                  <span>{d.size}</span>
                  {d.status === 'paid' && <Chip tone="success" size="xs">✓ {t.paid}</Chip>}
                  {d.status === 'unpaid' && <Chip tone="warn" size="xs">{t.unpaid}</Chip>}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────
// MENU / PROFILE
// ───────────────────────────────────────────────
function MenuScreen({ lang, navigate, onToggleLang }) {
  const t = T[lang];
  const { RESIDENTS } = window.DomeeioData;
  const me = RESIDENTS.find(r => r.id === 'me');
  const [view, setView] = useState2('menu');

  if (view === 'directory') {
    return (
      <div style={{ paddingBottom: 120 }}>
        <BackHeader lang={lang} onBack={() => setView('menu')} />
        <ScreenHeader lang={lang} title={t.directory} subtitle={`400 ${lang === 'mk' ? 'станови · 12 ката' : 'units · 12 floors'}`} />
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {RESIDENTS.filter(r => r.id !== 'me').map(r => (
            <Card key={r.id} padding={12}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Avatar user={r} size={42} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 14.5, fontWeight: 600, color: DOMEEIO_TOKENS.ink }}>
                      {lang === 'mk' ? r.name : r.en}
                    </span>
                    {r.role === 'president' && <Chip tone="primary" size="xs">{t.president}</Chip>}
                  </div>
                  <div style={{ fontSize: 12.5, color: DOMEEIO_TOKENS.inkSoft, marginTop: 2 }}>
                    {t.unit} {r.unit} · {t.floor} {r.floor}
                  </div>
                </div>
                <button style={{
                  padding: 8, borderRadius: 10, border: 'none',
                  background: DOMEEIO_TOKENS.bgSubtle, cursor: 'pointer',
                }}>
                  {Icon.chat(DOMEEIO_TOKENS.inkSoft)}
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: 120 }}>
      <BackHeader lang={lang} onBack={() => navigate('home')} />

      {/* Profile card */}
      <div style={{ padding: '0 20px' }}>
        <div style={{
          padding: 20, borderRadius: 20,
          background: `linear-gradient(135deg, ${DOMEEIO_TOKENS.bgSubtle}, ${DOMEEIO_TOKENS.primarySoft})`,
          textAlign: 'center',
        }}>
          <div style={{ display: 'inline-block', padding: 3, borderRadius: 72, background: 'white', marginBottom: 10 }}>
            <Avatar user={me} size={64} />
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: DOMEEIO_TOKENS.ink }}>
            {lang === 'mk' ? me.name : me.en}
          </div>
          <div style={{ fontSize: 13, color: DOMEEIO_TOKENS.inkSoft, marginTop: 3 }}>
            {t.unit} {me.unit} · {t.floor} {me.floor} · {T[lang].buildingName}
          </div>
        </div>

        <div style={{ marginTop: 20, background: DOMEEIO_TOKENS.bgElevated, borderRadius: 16, border: `1px solid ${DOMEEIO_TOKENS.border}`, overflow: 'hidden' }}>
          <MenuRow icon={Icon.cases(DOMEEIO_TOKENS.primary)} label={t.directory} onClick={() => setView('directory')} />
          <MenuRow icon={Icon.bell(DOMEEIO_TOKENS.amber)} label={lang === 'mk' ? 'Известувања' : 'Notifications'} />
          <MenuRow icon={Icon.globe(DOMEEIO_TOKENS.sage)} label={lang === 'mk' ? 'Јазик' : 'Language'} rightLabel={lang === 'mk' ? 'Македонски' : 'English'} onClick={onToggleLang} last />
        </div>

        <div style={{ marginTop: 14, background: DOMEEIO_TOKENS.bgElevated, borderRadius: 16, border: `1px solid ${DOMEEIO_TOKENS.border}`, overflow: 'hidden' }}>
          <MenuRow icon={Icon.gavel(DOMEEIO_TOKENS.sky)} label={lang === 'mk' ? 'Правилник' : 'House rules'} />
          <MenuRow icon={Icon.more(DOMEEIO_TOKENS.inkSoft)} label={lang === 'mk' ? 'Поддршка' : 'Support'} last />
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, fontSize: 11, color: DOMEEIO_TOKENS.inkMuted }}>
          Domeeio · v0.1 Pilot
        </div>
      </div>
    </div>
  );
}

function MenuRow({ icon, label, rightLabel, onClick, last }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', padding: '14px 16px', border: 'none',
      background: 'none', cursor: 'pointer', fontFamily: 'inherit',
      display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
      borderBottom: last ? 'none' : `1px solid ${DOMEEIO_TOKENS.border}`,
    }}>
      <div style={{ width: 28, display: 'flex', justifyContent: 'center' }}>{icon}</div>
      <div style={{ flex: 1, fontSize: 15, fontWeight: 500, color: DOMEEIO_TOKENS.ink }}>{label}</div>
      {rightLabel && <div style={{ fontSize: 13, color: DOMEEIO_TOKENS.inkMuted }}>{rightLabel}</div>}
      <span style={{ color: DOMEEIO_TOKENS.inkMuted, fontSize: 18 }}>›</span>
    </button>
  );
}

Object.assign(window, {
  PollsScreen, PollDetailScreen, CalendarScreen, DocsScreen, MenuScreen,
});
