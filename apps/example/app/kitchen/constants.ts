export const COUNTRIES = [
  { label: 'Việt Nam', value: 'vn' },
  { label: 'Japan', value: 'jp' },
  { label: 'Singapore', value: 'sg' },
  { label: 'South Korea', value: 'kr' },
];

export const LARGE_COUNTRIES = Array.from({ length: 50 }, (_, i) => ({
  label: `Country ${i + 1}`,
  value: `c${i}`,
}));

export const CONTACTS = [
  {
    id: '1',
    name: 'An Nguyen',
    role: 'Designer',
    initials: 'AN',
    time: '15:52',
    unread: 0,
  },
  {
    id: '2',
    name: 'Binh Tran',
    role: 'You: Sounds good',
    initials: 'BT',
    time: 'T.4',
    unread: 3,
  },
  {
    id: '3',
    name: 'Chi Le',
    role: 'Product sync tomorrow',
    initials: 'CL',
    time: '27/03',
    unread: 0,
  },
] as const;

export type Contact = (typeof CONTACTS)[number];

export type MainTab = 'components' | 'data' | 'feedback' | 'settings';
