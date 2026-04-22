// Main App shell — navigation, tab bar, tweaks
const { useState: useStateA, useEffect: useEffectA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "language": "mk",
  "primaryColor": "#c97a5f",
  "showWelcomeBanner": true
}/*EDITMODE-END*/;

function DomeeioApp() {
  const [lang, setLang] = useStateA(TWEAK_DEFAULTS.language);
  const [nav, setNav] = useStateA(() => {
    try {
      const saved = localStorage.getItem('domeeio-nav');
      return saved ? JSON.parse(saved) : { screen: 'home', param: null };
    } catch { return { screen: 'home', param: null }; }
  });
  const [votes, setVotes] = useStateA(() => {
    try { return JSON.parse(localStorage.getItem('domeeio-votes') || '{}'); } catch { return {}; }
  });
  const [tweaksOpen, setTweaksOpen] = useStateA(false);

  useEffectA(() => {
    localStorage.setItem('domeeio-nav', JSON.stringify(nav));
  }, [nav]);
  useEffectA(() => {
    localStorage.setItem('domeeio-votes', JSON.stringify(votes));
  }, [votes]);

  // Tweaks host protocol
  useEffectA(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode') setTweaksOpen(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const navigate = (screen, param = null) => setNav({ screen, param });
  const toggleLang = () => setLang(l => l === 'mk' ? 'en' : 'mk');

  const tabs = ['home', 'cases', 'chat', 'polls', 'docs'];
  const isMainTab = tabs.includes(nav.screen);

  let content;
  switch (nav.screen) {
    case 'home': content = <HomeScreen lang={lang} navigate={navigate} />; break;
    case 'cases': content = <CasesScreen lang={lang} navigate={navigate} />; break;
    case 'caseDetail': content = <CaseDetailScreen lang={lang} navigate={navigate} caseId={nav.param} />; break;
    case 'newCase': content = <NewCaseScreen lang={lang} navigate={navigate} />; break;
    case 'chat': content = <ChatScreen lang={lang} navigate={navigate} />; break;
    case 'polls': content = <PollsScreen lang={lang} navigate={navigate} votes={votes} setVotes={setVotes} />; break;
    case 'pollDetail': content = <PollDetailScreen lang={lang} navigate={navigate} pollId={nav.param} votes={votes} setVotes={setVotes} />; break;
    case 'calendar': content = <CalendarScreen lang={lang} />; break;
    case 'docs': content = <DocsScreen lang={lang} />; break;
    case 'menu': content = <MenuScreen lang={lang} navigate={navigate} onToggleLang={toggleLang} />; break;
    case 'craftsmen': content = <CraftsmenScreen lang={lang} navigate={navigate} />; break;
    case 'craftsmanDetail': content = <CraftsmanDetailScreen lang={lang} navigate={navigate} craftsmanId={nav.param} />; break;
    default: content = <HomeScreen lang={lang} navigate={navigate} />;
  }

  return (
    <div data-screen-label={`Domeeio / ${nav.screen}`} style={{
      position: 'relative', width: '100%', height: '100%',
      background: DOMEEIO_TOKENS.bg, overflow: 'hidden',
      fontFamily: '"Plus Jakarta Sans", -apple-system, system-ui, sans-serif',
      color: DOMEEIO_TOKENS.ink,
    }}>
      {/* Scrollable content — padded to clear status bar / dynamic island */}
      <div style={{
        position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden',
        paddingTop: 60,
      }}>
        {content}
      </div>

      {/* Tab bar */}
      {isMainTab && <TabBar lang={lang} current={nav.screen} navigate={navigate} />}

      {/* FAB for new case on home/cases */}
      {(nav.screen === 'cases') && (
        <button onClick={() => navigate('newCase')} style={{
          position: 'absolute', right: 20, bottom: 104,
          width: 56, height: 56, borderRadius: 28,
          background: DOMEEIO_TOKENS.primary, border: 'none',
          boxShadow: '0 6px 18px rgba(201,122,95,0.4), 0 2px 4px rgba(201,122,95,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 10,
        }}>
          {Icon.plus('#fff')}
        </button>
      )}

      {/* Tweaks panel */}
      {tweaksOpen && <TweaksPanel lang={lang} setLang={setLang} navigate={navigate} currentScreen={nav.screen} resetVotes={() => setVotes({})} />}
    </div>
  );
}

// ───────────────────────────────────────────────
// TAB BAR
// ───────────────────────────────────────────────
function TabBar({ lang, current, navigate }) {
  const t = T[lang];
  const items = [
    { id: 'home', label: t.tabs.home, icon: Icon.home },
    { id: 'cases', label: t.tabs.cases, icon: Icon.cases },
    { id: 'chat', label: t.tabs.chat, icon: Icon.chat },
    { id: 'polls', label: t.tabs.polls, icon: Icon.polls },
    { id: 'docs', label: t.tabs.docs, icon: Icon.docs },
  ];
  return (
    <div style={{
      position: 'absolute', left: 12, right: 12, bottom: 18,
      background: 'rgba(255,253,249,0.88)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      border: `1px solid ${DOMEEIO_TOKENS.border}`,
      borderRadius: 24, padding: '8px 4px',
      display: 'flex', justifyContent: 'space-around',
      boxShadow: '0 8px 24px rgba(42,36,28,0.08), 0 2px 6px rgba(42,36,28,0.04)',
      zIndex: 20,
    }}>
      {items.map(it => {
        const active = current === it.id;
        return (
          <button key={it.id} onClick={() => navigate(it.id)} style={{
            flex: 1, padding: '6px 4px', border: 'none',
            background: 'none', cursor: 'pointer', fontFamily: 'inherit',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            color: active ? DOMEEIO_TOKENS.primary : DOMEEIO_TOKENS.inkSoft,
          }}>
            {it.icon(active ? DOMEEIO_TOKENS.primary : DOMEEIO_TOKENS.inkSoft)}
            <span style={{ fontSize: 10.5, fontWeight: active ? 700 : 500, letterSpacing: 0.2 }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ───────────────────────────────────────────────
// TWEAKS PANEL
// ───────────────────────────────────────────────
function TweaksPanel({ lang, setLang, navigate, currentScreen, resetVotes }) {
  const jumpScreens = [
    { id: 'home', label: 'Home' },
    { id: 'cases', label: 'Cases list' },
    { id: 'caseDetail', label: 'Case detail', param: 'c2' },
    { id: 'newCase', label: 'New case' },
    { id: 'chat', label: 'Chat' },
    { id: 'polls', label: 'Polls list' },
    { id: 'pollDetail', label: 'Poll voting', param: 'p1' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'docs', label: 'Documents' },
    { id: 'craftsmen', label: 'Craftsmen list' },
    { id: 'craftsmanDetail', label: 'Craftsman profile', param: 'm1' },
    { id: 'menu', label: 'Menu / Profile' },
  ];

  return (
    <div style={{
      position: 'absolute', right: 12, bottom: 90, width: 270,
      background: 'white', borderRadius: 18, zIndex: 100,
      border: `1px solid ${DOMEEIO_TOKENS.border}`,
      boxShadow: '0 12px 32px rgba(42,36,28,0.15), 0 4px 10px rgba(42,36,28,0.08)',
      padding: 14, fontFamily: 'inherit',
    }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: DOMEEIO_TOKENS.ink, marginBottom: 10 }}>Tweaks</div>

      <div style={{ fontSize: 11, fontWeight: 700, color: DOMEEIO_TOKENS.inkMuted, textTransform: 'uppercase', letterSpacing: 0.6, marginTop: 4, marginBottom: 6 }}>Language</div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        {['mk', 'en'].map(l => (
          <button key={l} onClick={() => setLang(l)} style={{
            flex: 1, padding: '7px 10px', borderRadius: 10, border: 'none',
            background: lang === l ? DOMEEIO_TOKENS.ink : DOMEEIO_TOKENS.bgSubtle,
            color: lang === l ? 'white' : DOMEEIO_TOKENS.ink,
            fontSize: 12.5, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          }}>{l === 'mk' ? 'Македонски' : 'English'}</button>
        ))}
      </div>

      <div style={{ fontSize: 11, fontWeight: 700, color: DOMEEIO_TOKENS.inkMuted, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 6 }}>Jump to screen</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginBottom: 12 }}>
        {jumpScreens.map(s => (
          <button key={s.id} onClick={() => navigate(s.id, s.param || null)} style={{
            padding: '6px 8px', borderRadius: 8, border: `1px solid ${currentScreen === s.id ? DOMEEIO_TOKENS.primary : DOMEEIO_TOKENS.border}`,
            background: currentScreen === s.id ? DOMEEIO_TOKENS.primarySoft : 'white',
            color: currentScreen === s.id ? DOMEEIO_TOKENS.primaryInk : DOMEEIO_TOKENS.inkSoft,
            fontSize: 11.5, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
            textAlign: 'left',
          }}>{s.label}</button>
        ))}
      </div>

      <button onClick={resetVotes} style={{
        width: '100%', padding: '8px 10px', borderRadius: 10,
        background: DOMEEIO_TOKENS.bgSubtle, border: `1px solid ${DOMEEIO_TOKENS.border}`,
        color: DOMEEIO_TOKENS.inkSoft, fontSize: 12.5, fontWeight: 600,
        cursor: 'pointer', fontFamily: 'inherit',
      }}>Reset my votes</button>
    </div>
  );
}

window.DomeeioApp = DomeeioApp;
