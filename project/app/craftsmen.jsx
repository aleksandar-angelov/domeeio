// Craftsmen (Мајстор) marketplace data & screens
const { useState: useStateC } = React;

const TRADES = [
  { id: 'plumber', mk: 'Водоинсталатер', en: 'Plumber', icon: 'drop', color: '#6e8ba0' },
  { id: 'electrician', mk: 'Електричар', en: 'Electrician', icon: 'bolt', color: '#b88a4a' },
  { id: 'painter', mk: 'Молер', en: 'Painter', icon: 'wrench', color: '#c97889' },
  { id: 'locksmith', mk: 'Браварџија', en: 'Locksmith', icon: 'wrench', color: '#7a9a6e' },
  { id: 'hvac', mk: 'Климатизер', en: 'HVAC', icon: 'bolt', color: '#a47aa8' },
  { id: 'general', mk: 'Општ мајстор', en: 'Handyman', icon: 'wrench', color: '#c97a5f' },
];

const CRAFTSMEN = [
  { id: 'm1', name: 'Благоја Трајковски', en: 'Blagoja Trajkovski', trade: 'plumber', city: 'Скопје', rating: 4.9, reviews: 128, years: 14, price: '800–1,500 ден./час', avail: 'today', initials: 'БТ', color: '#6e8ba0', verified: true, desc: { mk: 'Брза интервенција, 24/7 за итни случаи. Специјалност: ПВЦ и бакарни цевки.', en: 'Fast response, 24/7 emergencies. Specialty: PVC & copper piping.' } },
  { id: 'm2', name: 'Игор Димковски', en: 'Igor Dimkovski', trade: 'electrician', city: 'Скопје', rating: 4.8, reviews: 96, years: 9, price: '900–1,800 ден./час', avail: 'tomorrow', initials: 'ИД', color: '#b88a4a', verified: true, desc: { mk: 'Овластен електричар, инсталации и поправки во станови и згради.', en: 'Licensed electrician, installations and repairs in apartments and buildings.' } },
  { id: 'm3', name: 'Стефан Анастасов', en: 'Stefan Anastasov', trade: 'painter', city: 'Скопје', rating: 4.7, reviews: 52, years: 6, price: 'по површина', avail: 'next-week', initials: 'СА', color: '#c97889', verified: false, desc: { mk: 'Молерисување, декоративни техники, глетување. Бесплатна проценка.', en: 'Painting, decorative finishes, skim coat. Free estimate.' } },
  { id: 'm4', name: 'Никола Ѓоргиевски', en: 'Nikola Gjorgievski', trade: 'locksmith', city: 'Скопје', rating: 5.0, reviews: 41, years: 20, price: 'фиксна тарифа', avail: 'today', initials: 'НЃ', color: '#7a9a6e', verified: true, desc: { mk: 'Отворање врати, менување брави, сефови. 24/7.', en: 'Door opening, lock changes, safes. 24/7.' } },
  { id: 'm5', name: 'Елена Митревска', en: 'Elena Mitrevska', trade: 'hvac', city: 'Скопје', rating: 4.9, reviews: 73, years: 11, price: '2,000–4,000 ден.', avail: 'tomorrow', initials: 'ЕМ', color: '#a47aa8', verified: true, desc: { mk: 'Сервис и монтажа на клими. Годишно одржување со попуст.', en: 'AC service & installation. Annual maintenance at a discount.' } },
  { id: 'm6', name: 'Дарко Павлов', en: 'Darko Pavlov', trade: 'general', city: 'Скопје', rating: 4.6, reviews: 88, years: 8, price: '600–1,200 ден./час', avail: 'today', initials: 'ДП', color: '#c97a5f', verified: false, desc: { mk: 'Ситни поправки, монтажа мебел, кујнски елементи.', en: 'Small repairs, furniture assembly, kitchen elements.' } },
];

const MY_BOOKINGS = [
  { id: 'b1', craftsman: 'm1', date: 'Пет 25 Апр', en_date: 'Fri 25 Apr', time: '10:00', status: 'confirmed', desc: { mk: 'Протекува славина во кујна', en: 'Kitchen faucet leaking' } },
];

window.CraftsmenData = { TRADES, CRAFTSMEN, MY_BOOKINGS };

// ───────────────────────────────────────────────
// CRAFTSMEN LIST
// ───────────────────────────────────────────────
function CraftsmenScreen({ lang, navigate }) {
  const t = T[lang];
  const [trade, setTrade] = useStateC('all');
  const [showBookings, setShowBookings] = useStateC(false);

  const filtered = trade === 'all' ? CRAFTSMEN : CRAFTSMEN.filter(c => c.trade === trade);

  const availLabel = (a) => {
    if (a === 'today') return lang === 'mk' ? 'Достапен денес' : 'Available today';
    if (a === 'tomorrow') return lang === 'mk' ? 'Утре' : 'Tomorrow';
    return lang === 'mk' ? 'Следна недела' : 'Next week';
  };
  const availTone = (a) => a === 'today' ? 'success' : a === 'tomorrow' ? 'sage' : 'neutral';

  return (
    <div style={{ paddingBottom: 120 }}>
      <BackHeader lang={lang} onBack={() => navigate('home')} />
      <div style={{ padding: '0 20px 14px' }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: DOMEEIO_TOKENS.ink, letterSpacing: -0.6 }}>
          {lang === 'mk' ? 'Мајстор' : 'Craftsmen'}
        </div>
        <div style={{ fontSize: 13.5, color: DOMEEIO_TOKENS.inkSoft, marginTop: 4, lineHeight: 1.45 }}>
          {lang === 'mk'
            ? 'Резервирај проверен мајстор во Скопје. Оценети од соседи.'
            : 'Book a vetted craftsman in Skopje. Rated by neighbors.'}
        </div>
      </div>

      {/* My bookings banner */}
      {MY_BOOKINGS.length > 0 && (
        <div style={{ padding: '0 20px 14px' }}>
          <Card padding={14} onClick={() => setShowBookings(!showBookings)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, background: DOMEEIO_TOKENS.sageSoft,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>{Icon.calendar(DOMEEIO_TOKENS.sageInk)}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, color: DOMEEIO_TOKENS.inkSoft, fontWeight: 500 }}>
                  {lang === 'mk' ? 'Мое активно закажување' : 'My active booking'}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: DOMEEIO_TOKENS.ink, marginTop: 2 }}>
                  {(() => {
                    const b = MY_BOOKINGS[0];
                    const c = CRAFTSMEN.find(x => x.id === b.craftsman);
                    return `${lang === 'mk' ? c.name : c.en} · ${lang === 'mk' ? b.date : b.en_date} ${b.time}`;
                  })()}
                </div>
              </div>
              <Chip tone="success" size="xs">✓ {lang === 'mk' ? 'Потврдено' : 'Confirmed'}</Chip>
            </div>
          </Card>
        </div>
      )}

      {/* Trade chips */}
      <div style={{ padding: '0 20px 12px', display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 8 }}>
        {[{ id: 'all', mk: 'Сите', en: 'All' }, ...TRADES].map(tr => (
          <button key={tr.id} onClick={() => setTrade(tr.id)} style={{
            padding: '8px 14px', borderRadius: 999, flexShrink: 0,
            border: `1px solid ${trade === tr.id ? DOMEEIO_TOKENS.ink : DOMEEIO_TOKENS.border}`,
            background: trade === tr.id ? DOMEEIO_TOKENS.ink : DOMEEIO_TOKENS.bgElevated,
            color: trade === tr.id ? 'white' : DOMEEIO_TOKENS.inkSoft,
            fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
          }}>{tr[lang]}</button>
        ))}
      </div>

      {/* Craftsmen cards */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map(c => {
          const tr = TRADES.find(x => x.id === c.trade);
          const IconFn = Icon[tr.icon] || Icon.wrench;
          return (
            <Card key={c.id} padding={14} onClick={() => navigate('craftsmanDetail', c.id)}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14, background: c.color, color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 17, fontWeight: 700, flexShrink: 0,
                  boxShadow: 'inset 0 -1px 2px rgba(0,0,0,0.08)',
                }}>{c.initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'nowrap' }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: DOMEEIO_TOKENS.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0 }}>
                      {lang === 'mk' ? c.name : c.en}
                    </span>
                    {c.verified && <span title="verified" style={{ color: DOMEEIO_TOKENS.sage, display: 'flex', flexShrink: 0 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.5 2 3.5-.5.5 3.5L21 9.5 19 12l2 2.5-2.5 2.5.5 3.5-3.5-.5L12 22l-2.5-2-3.5.5-.5-3.5L3 14.5 5 12l-2-2.5 2.5-2.5-.5-3.5 3.5.5L12 2z" fill={DOMEEIO_TOKENS.sage}/><path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>}
                  </div>
                  <div style={{ fontSize: 12.5, color: DOMEEIO_TOKENS.inkSoft, marginTop: 3 }}>
                    <span style={{ color: tr.color, fontWeight: 600 }}>{tr[lang]}</span>
                    <span style={{ color: DOMEEIO_TOKENS.inkMuted }}> · {c.years} {lang === 'mk' ? 'год.' : 'yrs'} · {c.city}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 12.5 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill={DOMEEIO_TOKENS.amber}><path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.7 7L12 17.8 5.7 21.2l1.7-7L2 9.5l7.1-.6L12 2z"/></svg>
                      <strong style={{ color: DOMEEIO_TOKENS.ink, fontVariantNumeric: 'tabular-nums' }}>{c.rating}</strong>
                      <span style={{ color: DOMEEIO_TOKENS.inkMuted }}>({c.reviews})</span>
                    </div>
                    <Chip tone={availTone(c.avail)} size="xs">{availLabel(c.avail)}</Chip>
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
// CRAFTSMAN DETAIL + BOOKING
// ───────────────────────────────────────────────
function CraftsmanDetailScreen({ lang, navigate, craftsmanId }) {
  const t = T[lang];
  const c = CRAFTSMEN.find(x => x.id === craftsmanId);
  const tr = TRADES.find(x => x.id === c.trade);
  const [step, setStep] = useStateC('profile'); // profile | booking | confirmed
  const [date, setDate] = useStateC(null);
  const [time, setTime] = useStateC(null);
  const [desc, setDesc] = useStateC('');

  const dates = [
    { id: 'd1', mk: 'Сре', en: 'Wed', num: 23 },
    { id: 'd2', mk: 'Чет', en: 'Thu', num: 24 },
    { id: 'd3', mk: 'Пет', en: 'Fri', num: 25 },
    { id: 'd4', mk: 'Саб', en: 'Sat', num: 26 },
    { id: 'd5', mk: 'Пон', en: 'Mon', num: 28 },
  ];
  const slots = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];

  if (step === 'confirmed') {
    const d = dates.find(x => x.id === date);
    return (
      <div style={{ paddingBottom: 120 }}>
        <BackHeader lang={lang} onBack={() => navigate('craftsmen')} />
        <div style={{ padding: '40px 28px', textAlign: 'center' }}>
          <div style={{
            width: 84, height: 84, borderRadius: 84, background: DOMEEIO_TOKENS.sageSoft,
            margin: '0 auto 18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4 10-10" stroke={DOMEEIO_TOKENS.sageInk} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: DOMEEIO_TOKENS.ink, margin: 0 }}>
            {lang === 'mk' ? 'Закажано!' : 'Booked!'}
          </h2>
          <p style={{ fontSize: 14, color: DOMEEIO_TOKENS.inkSoft, marginTop: 10, lineHeight: 1.5 }}>
            {lang === 'mk' ? c.name : c.en} · {d[lang]} {d.num} · {time}
          </p>
          <p style={{ fontSize: 13, color: DOMEEIO_TOKENS.inkMuted, marginTop: 6 }}>
            {lang === 'mk' ? 'Мајсторот ќе ја потврди резервацијата.' : 'The craftsman will confirm your booking.'}
          </p>
          <button onClick={() => navigate('craftsmen')} style={primaryBtn({ marginTop: 24 })}>
            {lang === 'mk' ? 'Готово' : 'Done'}
          </button>
        </div>
      </div>
    );
  }

  if (step === 'booking') {
    return (
      <div style={{ paddingBottom: 140 }}>
        <BackHeader lang={lang} onBack={() => setStep('profile')} />
        <div style={{ padding: '0 20px' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: DOMEEIO_TOKENS.ink, letterSpacing: -0.4 }}>
            {lang === 'mk' ? 'Закажи термин' : 'Book a time'}
          </div>
          <div style={{ fontSize: 13, color: DOMEEIO_TOKENS.inkSoft, marginTop: 4 }}>
            {lang === 'mk' ? 'со' : 'with'} {lang === 'mk' ? c.name : c.en}
          </div>

          <FieldLabel>{lang === 'mk' ? 'Датум' : 'Date'}</FieldLabel>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            {dates.map(d => (
              <button key={d.id} onClick={() => setDate(d.id)} style={{
                flexShrink: 0, width: 62, padding: '10px 0', borderRadius: 12,
                border: `1.5px solid ${date === d.id ? DOMEEIO_TOKENS.primary : DOMEEIO_TOKENS.border}`,
                background: date === d.id ? DOMEEIO_TOKENS.primary : DOMEEIO_TOKENS.bgElevated,
                color: date === d.id ? 'white' : DOMEEIO_TOKENS.ink,
                fontFamily: 'inherit', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              }}>
                <span style={{ fontSize: 11, fontWeight: 600, opacity: 0.8 }}>{d[lang]}</span>
                <span style={{ fontSize: 20, fontWeight: 700 }}>{d.num}</span>
              </button>
            ))}
          </div>

          <FieldLabel>{lang === 'mk' ? 'Време' : 'Time'}</FieldLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {slots.map(s => (
              <button key={s} onClick={() => setTime(s)} style={{
                padding: '10px 0', borderRadius: 10,
                border: `1.5px solid ${time === s ? DOMEEIO_TOKENS.primary : DOMEEIO_TOKENS.border}`,
                background: time === s ? DOMEEIO_TOKENS.primarySoft : DOMEEIO_TOKENS.bgElevated,
                color: time === s ? DOMEEIO_TOKENS.primaryInk : DOMEEIO_TOKENS.ink,
                fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                fontVariantNumeric: 'tabular-nums',
              }}>{s}</button>
            ))}
          </div>

          <FieldLabel>{lang === 'mk' ? 'Опис на работата' : 'Job description'}</FieldLabel>
          <TextArea value={desc} onChange={setDesc} placeholder={lang === 'mk' ? 'Што треба да се направи…' : 'What needs to be done…'} />

          <button onClick={() => date && time && setStep('confirmed')} disabled={!date || !time} style={{
            ...primaryBtn({ marginTop: 24 }),
            opacity: (date && time) ? 1 : 0.4,
          }}>
            {lang === 'mk' ? 'Потврди резервација' : 'Confirm booking'}
          </button>
        </div>
      </div>
    );
  }

  // Profile
  return (
    <div style={{ paddingBottom: 140 }}>
      <BackHeader lang={lang} onBack={() => navigate('craftsmen')} />
      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{
            width: 76, height: 76, borderRadius: 20, background: c.color, color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, fontWeight: 700, flexShrink: 0,
            boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.1)',
          }}>{c.initials}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <h1 style={{ fontSize: 20, fontWeight: 700, color: DOMEEIO_TOKENS.ink, margin: 0, letterSpacing: -0.3, lineHeight: 1.2 }}>
                {lang === 'mk' ? c.name : c.en}
              </h1>
              {c.verified && <span style={{ color: DOMEEIO_TOKENS.sage, display: 'flex', flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.5 2 3.5-.5.5 3.5L21 9.5 19 12l2 2.5-2.5 2.5.5 3.5-3.5-.5L12 22l-2.5-2-3.5.5-.5-3.5L3 14.5 5 12l-2-2.5 2.5-2.5-.5-3.5 3.5.5L12 2z" fill={DOMEEIO_TOKENS.sage}/><path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>}
            </div>
            <div style={{ fontSize: 13, color: tr.color, fontWeight: 600, marginTop: 6 }}>{tr[lang]}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6, fontSize: 13 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill={DOMEEIO_TOKENS.amber}><path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.7 7L12 17.8 5.7 21.2l1.7-7L2 9.5l7.1-.6L12 2z"/></svg>
              <strong style={{ color: DOMEEIO_TOKENS.ink }}>{c.rating}</strong>
              <span style={{ color: DOMEEIO_TOKENS.inkMuted }}>· {c.reviews} {lang === 'mk' ? 'оценки' : 'reviews'}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 18 }}>
          <StatBox label={lang === 'mk' ? 'Искуство' : 'Experience'} value={`${c.years} ${lang === 'mk' ? 'год.' : 'yrs'}`} />
          <StatBox label={lang === 'mk' ? 'Град' : 'City'} value={c.city} />
          <StatBox label={lang === 'mk' ? 'Цена' : 'Rate'} value={c.price} small />
        </div>

        <div style={{ marginTop: 18, fontSize: 14.5, color: DOMEEIO_TOKENS.inkSoft, lineHeight: 1.55, textWrap: 'pretty' }}>
          {c.desc[lang]}
        </div>

        <div style={{ marginTop: 20, padding: 14, borderRadius: 14, background: DOMEEIO_TOKENS.sageSoft, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ color: DOMEEIO_TOKENS.sageInk }}>{Icon.check(DOMEEIO_TOKENS.sageInk)}</div>
          <div style={{ fontSize: 13, color: DOMEEIO_TOKENS.sageInk, fontWeight: 600 }}>
            {c.avail === 'today'
              ? (lang === 'mk' ? 'Достапен денес за итни повици' : 'Available today for urgent calls')
              : (lang === 'mk' ? 'Следно слободно: утре' : 'Next available: tomorrow')}
          </div>
        </div>

        {/* Recent reviews */}
        <div style={{ fontSize: 13, fontWeight: 700, color: DOMEEIO_TOKENS.inkSoft, textTransform: 'uppercase', letterSpacing: 0.8, marginTop: 22, marginBottom: 10 }}>
          {lang === 'mk' ? 'Оценки од соседи' : 'Neighbor reviews'}
        </div>
        {[
          { by: 'Ана, стан 12', en_by: 'Ana, unit 12', rating: 5, text: { mk: 'Дојде за 30 минути и го реши проблемот брзо. Препорака!', en: 'Came in 30 minutes and fixed it fast. Highly recommend!' } },
          { by: 'Марко, стан 8', en_by: 'Marko, unit 8', rating: 5, text: { mk: 'Уредно, чисто и по добра цена.', en: 'Tidy, clean, and fair pricing.' } },
        ].map((r, i) => (
          <div key={i} style={{ padding: '12px 0', borderTop: i === 0 ? 'none' : `1px solid ${DOMEEIO_TOKENS.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, flexWrap: 'wrap' }}>
              <strong style={{ color: DOMEEIO_TOKENS.ink, whiteSpace: 'nowrap' }}>{lang === 'mk' ? r.by : r.en_by}</strong>
              <span style={{ color: DOMEEIO_TOKENS.amber, fontSize: 12, whiteSpace: 'nowrap' }}>{'★'.repeat(r.rating)}</span>
            </div>
            <div style={{ fontSize: 13.5, color: DOMEEIO_TOKENS.inkSoft, marginTop: 4, lineHeight: 1.45 }}>
              {r.text[lang]}
            </div>
          </div>
        ))}

        {/* Sticky-ish CTA */}
        <button onClick={() => setStep('booking')} style={primaryBtn({ marginTop: 24 })}>
          {lang === 'mk' ? 'Закажи термин' : 'Book a time'}
        </button>
        <div style={{ fontSize: 11, color: DOMEEIO_TOKENS.inkMuted, textAlign: 'center', marginTop: 8, lineHeight: 1.5 }}>
          {lang === 'mk'
            ? 'Мајсторите се независни изведувачи — Domeeio не е страна во договорот.'
            : 'Craftsmen are independent contractors — Domeeio is not a party to the contract.'}
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, small }) {
  return (
    <div style={{
      padding: '10px 12px', borderRadius: 12,
      background: DOMEEIO_TOKENS.bgElevated, border: `1px solid ${DOMEEIO_TOKENS.border}`,
    }}>
      <div style={{ fontSize: 10.5, fontWeight: 700, color: DOMEEIO_TOKENS.inkMuted, textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</div>
      <div style={{ fontSize: small ? 12 : 15, fontWeight: 700, color: DOMEEIO_TOKENS.ink, marginTop: 3, letterSpacing: -0.2 }}>{value}</div>
    </div>
  );
}

Object.assign(window, { CraftsmenScreen, CraftsmanDetailScreen });
