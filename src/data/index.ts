export interface Resident {
  id: string;
  name: string;
  en: string;
  unit: string;
  floor: number;
  role?: string;
  avatar: string;
  color: string;
}

export interface Announcement {
  id: string;
  author: string;
  pinned?: boolean;
  title: { mk: string; en: string };
  body: { mk: string; en: string };
  time: { mk: string; en: string };
}

export interface Case {
  id: string;
  title: { mk: string; en: string };
  cat: string;
  status: 'open' | 'in_progress' | 'resolved';
  reporter: string;
  assignee: string | null;
  date: string;
  priority: 'low' | 'med' | 'high';
  unit: string;
}

export interface PollOption {
  id: string;
  label: { mk: string; en: string };
  votes: number;
  color?: string;
}

export interface Poll {
  id: string;
  title: { mk: string; en: string };
  desc: { mk: string; en: string };
  deadline: { mk: string; en: string };
  participation: number;
  total: number;
  options: PollOption[];
  voted: string | null;
  closed?: boolean;
}

export interface CalEvent {
  id: string;
  title: { mk: string; en: string };
  day: string;
  date: string;
  time: string;
  color: string;
  tag: string;
}

export interface Doc {
  id: string;
  type: 'bill' | 'minutes' | 'doc';
  title: { mk: string; en: string };
  amount?: string;
  status?: 'paid' | 'unpaid';
  due?: string;
  size: string;
}

export interface ChatMessage {
  id: string;
  user: string;
  text: { mk: string; en: string };
  time: string;
  badge?: string;
}

export interface Trade {
  id: string;
  mk: string;
  en: string;
  icon: string;
  color: string;
}

export interface Craftsman {
  id: string;
  name: string;
  en: string;
  trade: string;
  city: string;
  rating: number;
  reviews: number;
  years: number;
  price: string;
  avail: 'today' | 'tomorrow' | 'next-week';
  initials: string;
  color: string;
  verified: boolean;
  desc: { mk: string; en: string };
}

export interface Booking {
  id: string;
  craftsman: string;
  date: string;
  en_date: string;
  time: string;
  status: string;
  desc: { mk: string; en: string };
}

const RESIDENTS: Resident[] = [
  { id: 'u1', name: 'Ана Стојановска', en: 'Ana Stojanovska', unit: '12', floor: 4, role: 'president', avatar: 'AS', color: '#c97a5f' },
  { id: 'u2', name: 'Марко Петровски', en: 'Marko Petrovski', unit: '8', floor: 3, avatar: 'МП', color: '#7a9a6e' },
  { id: 'u3', name: 'Елена Николова', en: 'Elena Nikolova', unit: '24', floor: 7, avatar: 'ЕН', color: '#b88a4a' },
  { id: 'u4', name: 'Горан Илиевски', en: 'Goran Ilievski', unit: '5', floor: 2, avatar: 'ГИ', color: '#6e8ba0' },
  { id: 'u5', name: 'Сара Трајкова', en: 'Sara Trajkova', unit: '31', floor: 9, avatar: 'СТ', color: '#a47aa8' },
  { id: 'u6', name: 'Димитар Јованов', en: 'Dimitar Jovanov', unit: '17', floor: 5, avatar: 'ДЈ', color: '#c9a15f' },
  { id: 'u7', name: 'Катерина Ристеска', en: 'Katerina Risteska', unit: '2', floor: 1, avatar: 'КР', color: '#8a9f7a' },
  { id: 'me', name: 'Ти (Стан 19)', en: 'You (Unit 19)', unit: '19', floor: 6, avatar: 'ТИ', color: '#6b7e8f' },
];

const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'a1', author: 'u1', pinned: true,
    title: { mk: 'Прекин на вода — среда 08:00–14:00', en: 'Water outage — Wed 8am–2pm' },
    body: { mk: 'Замена на главниот вентил во подрумот. Подгответе вода однапред.', en: 'Main valve replacement in basement. Please store water in advance.' },
    time: { mk: 'пред 2ч', en: '2h ago' },
  },
  {
    id: 'a2', author: 'u1',
    title: { mk: 'Чистење на скали — петок', en: 'Stairwell cleaning — Friday' },
    body: { mk: 'Молиме да не оставате обувки на скалите до 18:00.', en: 'Please remove shoes from stairwells until 6pm.' },
    time: { mk: 'вчера', en: 'yesterday' },
  },
];

const CASES: Case[] = [
  { id: 'c1', title: { mk: 'Светло не работи на катот 3', en: 'Hallway light out — 3rd floor' }, cat: 'electrical', status: 'in_progress', reporter: 'u2', assignee: 'Електро Стан д.о.о.', date: '21 Apr', priority: 'med', unit: '—' },
  { id: 'c2', title: { mk: 'Лифт прави чуден звук', en: 'Elevator making strange noise' }, cat: 'elevator', status: 'open', reporter: 'u3', assignee: null, date: '22 Apr', priority: 'high', unit: '—' },
  { id: 'c3', title: { mk: 'Протекува кров над стан 31', en: 'Roof leaking over unit 31' }, cat: 'plumbing', status: 'open', reporter: 'u5', assignee: null, date: '22 Apr', priority: 'high', unit: '31' },
  { id: 'c4', title: { mk: 'Скршено стакло на влезна врата', en: 'Broken glass on entrance door' }, cat: 'general', status: 'resolved', reporter: 'u4', assignee: 'Стакларска работилница', date: '18 Apr', priority: 'med', unit: '—' },
  { id: 'c5', title: { mk: 'Домофон стан 19 не работи', en: 'Intercom unit 19 not working' }, cat: 'electrical', status: 'open', reporter: 'me', assignee: null, date: '22 Apr', priority: 'low', unit: '19' },
];

const POLLS: Poll[] = [
  {
    id: 'p1',
    title: { mk: 'Боја на ходници — реновирање', en: 'Hallway color — renovation' },
    desc: { mk: 'Која боја предлагате за ходниците после кречењето следниот месец?', en: "Which color for the hallways after next month's repainting?" },
    deadline: { mk: 'Затвора за 3 дена', en: 'Closes in 3 days' },
    participation: 62, total: 400,
    options: [
      { id: 'o1', label: { mk: 'Топла бежа', en: 'Warm beige' }, votes: 142, color: '#e8d4b8' },
      { id: 'o2', label: { mk: 'Светло сива', en: 'Light grey' }, votes: 68, color: '#d0d4d0' },
      { id: 'o3', label: { mk: 'Постоечка', en: 'Keep current' }, votes: 38, color: '#c9b299' },
    ],
    voted: null,
  },
  {
    id: 'p2',
    title: { mk: 'Заменик претседател', en: 'Vice president' },
    desc: { mk: 'Избор на заменик претседател за мандатот 2026–2027.', en: 'Election for vice president, 2026–2027 term.' },
    deadline: { mk: 'Затвора за 8 дена', en: 'Closes in 8 days' },
    participation: 28, total: 400,
    options: [
      { id: 'o1', label: { mk: 'Марко Петровски, стан 8', en: 'Marko Petrovski, unit 8' }, votes: 54 },
      { id: 'o2', label: { mk: 'Елена Николова, стан 24', en: 'Elena Nikolova, unit 24' }, votes: 58 },
    ],
    voted: null,
  },
  {
    id: 'p3',
    title: { mk: 'Купување градинарски алати', en: 'Gardening tools purchase' },
    desc: { mk: 'Да одвоиме ли 8.000 ден. од резервата за алати?', en: 'Allocate 8,000 MKD from reserves for tools?' },
    deadline: { mk: 'Завршено', en: 'Closed' },
    participation: 78, total: 400,
    options: [
      { id: 'o1', label: { mk: 'За', en: 'Yes' }, votes: 231 },
      { id: 'o2', label: { mk: 'Против', en: 'No' }, votes: 41 },
      { id: 'o3', label: { mk: 'Воздржан', en: 'Abstain' }, votes: 40 },
    ],
    voted: 'o1', closed: true,
  },
];

const EVENTS: CalEvent[] = [
  { id: 'e1', title: { mk: 'Прекин на вода', en: 'Water outage' }, day: 'Wed', date: '23', time: '08:00–14:00', color: '#c97a5f', tag: 'maintenance' },
  { id: 'e2', title: { mk: 'Чистење скали', en: 'Stairwell cleaning' }, day: 'Fri', date: '25', time: '09:00', color: '#7a9a6e', tag: 'cleaning' },
  { id: 'e3', title: { mk: 'Годишно собрание', en: 'Annual assembly' }, day: 'Sun', date: '27', time: '19:00', color: '#b88a4a', tag: 'meeting' },
  { id: 'e4', title: { mk: 'Контрола на лифт', en: 'Elevator inspection' }, day: 'Tue', date: '29', time: '10:00–12:00', color: '#6e8ba0', tag: 'maintenance' },
  { id: 'e5', title: { mk: 'Дезинсекција подрум', en: 'Basement pest control' }, day: 'Thu', date: '01', time: '14:00', color: '#a47aa8', tag: 'maintenance' },
];

const DOCS: Doc[] = [
  { id: 'd1', type: 'bill', title: { mk: 'Месечна сметка — Април 2026', en: 'Monthly bill — April 2026' }, amount: '1,240 ден.', status: 'unpaid', due: '30 Apr', size: '1 стр.' },
  { id: 'd2', type: 'bill', title: { mk: 'Месечна сметка — Март 2026', en: 'Monthly bill — March 2026' }, amount: '1,180 ден.', status: 'paid', due: '31 Mar', size: '1 стр.' },
  { id: 'd3', type: 'bill', title: { mk: 'Месечна сметка — Февруари 2026', en: 'Monthly bill — February 2026' }, amount: '1,180 ден.', status: 'paid', due: '28 Feb', size: '1 стр.' },
  { id: 'd4', type: 'minutes', title: { mk: 'Записник од собрание — 12.03.2026', en: 'Assembly minutes — 12 Mar 2026' }, size: '4 стр.' },
  { id: 'd5', type: 'doc', title: { mk: 'Годишен финансиски извештај 2025', en: 'Annual financial report 2025' }, size: '12 стр.' },
  { id: 'd6', type: 'doc', title: { mk: 'Правилник за домување', en: 'House rules' }, size: '6 стр.' },
  { id: 'd7', type: 'minutes', title: { mk: 'Записник — 04.02.2026', en: 'Minutes — 4 Feb 2026' }, size: '3 стр.' },
];

const CHAT: ChatMessage[] = [
  { id: 'm1', user: 'u3', text: { mk: 'Некој слушна звук од лифтот вечерва?', en: 'Did anyone hear a sound from the elevator tonight?' }, time: '19:42' },
  { id: 'm2', user: 'u2', text: { mk: 'Да, и јас. Звучи како нешто да се тркала.', en: 'Yes, me too. Sounds like something rolling.' }, time: '19:44' },
  { id: 'm3', user: 'u1', text: { mk: 'Отворив случај, сервисерот доаѓа утре во 10.', en: 'Opened a case, technician coming tomorrow at 10.' }, time: '19:51', badge: 'president' },
  { id: 'm4', user: 'u5', text: { mk: 'Благодарам Ана 🙏', en: 'Thanks Ana 🙏' }, time: '19:52' },
  { id: 'm5', user: 'u6', text: { mk: 'Дали може да се синхронизира со прекинот на вода во среда?', en: 'Can it be combined with the water outage on Wednesday?' }, time: '20:03' },
  { id: 'm6', user: 'u1', text: { mk: 'Добра идеја, ќе проверам.', en: "Good idea, I'll check." }, time: '20:07', badge: 'president' },
  { id: 'm7', user: 'me', text: { mk: 'Ви благодарам на сите ❤️', en: 'Thanks everyone ❤️' }, time: '20:14' },
];

const TRADES: Trade[] = [
  { id: 'plumber', mk: 'Водоинсталатер', en: 'Plumber', icon: 'drop', color: '#6e8ba0' },
  { id: 'electrician', mk: 'Електричар', en: 'Electrician', icon: 'bolt', color: '#b88a4a' },
  { id: 'painter', mk: 'Молер', en: 'Painter', icon: 'wrench', color: '#c97889' },
  { id: 'locksmith', mk: 'Браварџија', en: 'Locksmith', icon: 'wrench', color: '#7a9a6e' },
  { id: 'hvac', mk: 'Климатизер', en: 'HVAC', icon: 'bolt', color: '#a47aa8' },
  { id: 'general', mk: 'Општ мајстор', en: 'Handyman', icon: 'wrench', color: '#c97a5f' },
];

const CRAFTSMEN: Craftsman[] = [
  { id: 'm1', name: 'Благоја Трајковски', en: 'Blagoja Trajkovski', trade: 'plumber', city: 'Скопје', rating: 4.9, reviews: 128, years: 14, price: '800–1,500 ден./час', avail: 'today', initials: 'БТ', color: '#6e8ba0', verified: true, desc: { mk: 'Брза интервенција, 24/7 за итни случаи. Специјалност: ПВЦ и бакарни цевки.', en: 'Fast response, 24/7 emergencies. Specialty: PVC & copper piping.' } },
  { id: 'm2', name: 'Игор Димковски', en: 'Igor Dimkovski', trade: 'electrician', city: 'Скопје', rating: 4.8, reviews: 96, years: 9, price: '900–1,800 ден./час', avail: 'tomorrow', initials: 'ИД', color: '#b88a4a', verified: true, desc: { mk: 'Овластен електричар, инсталации и поправки во станови и згради.', en: 'Licensed electrician, installations and repairs in apartments and buildings.' } },
  { id: 'm3', name: 'Стефан Анастасов', en: 'Stefan Anastasov', trade: 'painter', city: 'Скопје', rating: 4.7, reviews: 52, years: 6, price: 'по површина', avail: 'next-week', initials: 'СА', color: '#c97889', verified: false, desc: { mk: 'Молерисување, декоративни техники, глетување. Бесплатна проценка.', en: 'Painting, decorative finishes, skim coat. Free estimate.' } },
  { id: 'm4', name: 'Никола Ѓоргиевски', en: 'Nikola Gjorgievski', trade: 'locksmith', city: 'Скопје', rating: 5.0, reviews: 41, years: 20, price: 'фиксна тарифа', avail: 'today', initials: 'НЃ', color: '#7a9a6e', verified: true, desc: { mk: 'Отворање врати, менување брави, сефови. 24/7.', en: 'Door opening, lock changes, safes. 24/7.' } },
  { id: 'm5', name: 'Елена Митревска', en: 'Elena Mitrevska', trade: 'hvac', city: 'Скопје', rating: 4.9, reviews: 73, years: 11, price: '2,000–4,000 ден.', avail: 'tomorrow', initials: 'ЕМ', color: '#a47aa8', verified: true, desc: { mk: 'Сервис и монтажа на клими. Годишно одржување со попуст.', en: 'AC service & installation. Annual maintenance at a discount.' } },
  { id: 'm6', name: 'Дарко Павлов', en: 'Darko Pavlov', trade: 'general', city: 'Скопје', rating: 4.6, reviews: 88, years: 8, price: '600–1,200 ден./час', avail: 'today', initials: 'ДП', color: '#c97a5f', verified: false, desc: { mk: 'Ситни поправки, монтажа мебел, кујнски елементи.', en: 'Small repairs, furniture assembly, kitchen elements.' } },
];

const MY_BOOKINGS: Booking[] = [
  { id: 'b1', craftsman: 'm1', date: 'Пет 25 Апр', en_date: 'Fri 25 Apr', time: '10:00', status: 'confirmed', desc: { mk: 'Протекува славина во кујна', en: 'Kitchen faucet leaking' } },
];

export const DATA = {
  RESIDENTS,
  ANNOUNCEMENTS,
  CASES,
  POLLS,
  EVENTS,
  DOCS,
  CHAT,
  TRADES,
  CRAFTSMEN,
  MY_BOOKINGS,
};
