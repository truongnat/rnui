import { CONTACTS, type Contact } from '@/demo/demoData';

export type SocialPost = {
  id: string;
  author: Contact;
  body: string;
  imageUrl?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
};

export type TimelinePost = {
  id: string;
  author: Contact;
  handle: string;
  body: string;
  timestamp: string;
  likes: number;
  reposts: number;
  replies: number;
  liked: boolean;
  reposted: boolean;
};

const SOCIAL_BODIES = [
  'Shipped a new AnimatedList demo with enter/exit + layout animations. Scroll performance feels great on long feeds.',
  'Design review went well — raised surfaces and token-driven spacing are holding up across light and dark mode.',
  'Weekend hike near Da Lat. Nothing beats offline time before a big release week.',
  'RNUI compound components are clicking for our team. Less prop soup, clearer composition.',
  'Looking for feedback on staggered list entrances. Too much motion, or just right?',
];

const TIMELINE_BODIES = [
  'AnimatedList now supports FlashList + Reanimated layout transitions in one primitive. Big win for feed-style UIs.',
  'Hot take: list item height estimates matter more than fancy enter animations when you have 200+ rows.',
  'Shipping token-driven social feed demos today — Facebook-style cards + X-style compact rows in the same screen.',
  'If your FlatList contentContainerStyle has flex:1, you will fight scroll bugs forever. Ask me how I know.',
  'Reanimated layout on prepend lists is underrated. New posts sliding in at the top feels *chef kiss*.',
];

const SOCIAL_IMAGES = [
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=480&q=60',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=480&q=60',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=480&q=60',
];

const TIMELINE_TIMES = ['2m', '18m', '1h', '3h', 'Yesterday', 'Mon'];
const SOCIAL_TIMES = ['Just now', '45m', '2h', 'Yesterday', 'Mon'];

export function contactHandle(name: string): string {
  return `@${name.toLowerCase().replace(/\s+/g, '')}`;
}

export function formatEngagementCount(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return String(value);
}

function pickContact(index: number): Contact {
  return CONTACTS[index % CONTACTS.length];
}

const RANDOM_GIVEN_NAMES = [
  'An',
  'Binh',
  'Chi',
  'Duy',
  'Emma',
  'Finn',
  'Giang',
  'Hana',
  'Iris',
  'Jack',
  'Khanh',
  'Linh',
  'Minh',
  'Nora',
  'Oanh',
  'Phuc',
  'Quynh',
  'Ravi',
  'Son',
  'Tam',
] as const;

const RANDOM_FAMILY_NAMES = [
  'Nguyen',
  'Tran',
  'Le',
  'Pham',
  'Hoang',
  'Vo',
  'Dang',
  'Bui',
  'Do',
  'Ngo',
  'Truong',
  'Huynh',
  'Phan',
  'Vu',
  'Dinh',
] as const;

const RANDOM_ROLES = [
  'Designer',
  'Developer',
  'Product Manager',
  'Content Creator',
  'Engineering Lead',
  'You: Sounds good',
  'Meeting at 3pm',
  'Sent a photo',
  'On a call',
  'Available',
] as const;

/** Unique contact per insert — avoids FlashList recycle showing stale name/role. */
export function createRandomContact(uniqueId: string, seq: number): Contact {
  const given =
    RANDOM_GIVEN_NAMES[(seq + uniqueId.length) % RANDOM_GIVEN_NAMES.length];
  const family =
    RANDOM_FAMILY_NAMES[(seq * 3 + 7) % RANDOM_FAMILY_NAMES.length];
  const name = `${given} ${family} #${seq}`;
  const initials = `${given[0]}${family[0]}`.toUpperCase();

  return {
    id: uniqueId,
    name,
    role: RANDOM_ROLES[seq % RANDOM_ROLES.length],
    initials,
    time: 'Now',
    unread: seq % 5 === 0 ? (seq % 9) + 1 : 0,
  };
}

export function createInitialSocialPosts(): SocialPost[] {
  return [
    {
      id: 'social-1',
      author: pickContact(0),
      body: SOCIAL_BODIES[0],
      imageUrl: SOCIAL_IMAGES[0],
      timestamp: SOCIAL_TIMES[1],
      likes: 128,
      comments: 24,
      shares: 9,
      liked: true,
    },
    {
      id: 'social-2',
      author: pickContact(1),
      body: SOCIAL_BODIES[1],
      timestamp: SOCIAL_TIMES[2],
      likes: 56,
      comments: 11,
      shares: 3,
      liked: false,
    },
    {
      id: 'social-3',
      author: pickContact(4),
      body: SOCIAL_BODIES[2],
      imageUrl: SOCIAL_IMAGES[1],
      timestamp: SOCIAL_TIMES[3],
      likes: 412,
      comments: 37,
      shares: 18,
      liked: false,
    },
    {
      id: 'social-4',
      author: pickContact(6),
      body: SOCIAL_BODIES[3],
      timestamp: SOCIAL_TIMES[4],
      likes: 89,
      comments: 6,
      shares: 2,
      liked: false,
    },
  ];
}

export function createInitialTimelinePosts(): TimelinePost[] {
  return [
    {
      id: 'timeline-1',
      author: pickContact(2),
      handle: contactHandle(pickContact(2).name),
      body: TIMELINE_BODIES[0],
      timestamp: TIMELINE_TIMES[0],
      likes: 842,
      reposts: 112,
      replies: 46,
      liked: false,
      reposted: false,
    },
    {
      id: 'timeline-2',
      author: pickContact(3),
      handle: contactHandle(pickContact(3).name),
      body: TIMELINE_BODIES[1],
      timestamp: TIMELINE_TIMES[1],
      likes: 203,
      reposts: 28,
      replies: 19,
      liked: true,
      reposted: false,
    },
    {
      id: 'timeline-3',
      author: pickContact(5),
      handle: contactHandle(pickContact(5).name),
      body: TIMELINE_BODIES[2],
      timestamp: TIMELINE_TIMES[2],
      likes: 1204,
      reposts: 201,
      replies: 88,
      liked: false,
      reposted: true,
    },
    {
      id: 'timeline-4',
      author: pickContact(8),
      handle: contactHandle(pickContact(8).name),
      body: TIMELINE_BODIES[3],
      timestamp: TIMELINE_TIMES[3],
      likes: 97,
      reposts: 14,
      replies: 7,
      liked: false,
      reposted: false,
    },
    {
      id: 'timeline-5',
      author: pickContact(10),
      handle: contactHandle(pickContact(10).name),
      body: TIMELINE_BODIES[4],
      timestamp: TIMELINE_TIMES[4],
      likes: 531,
      reposts: 63,
      replies: 31,
      liked: true,
      reposted: false,
    },
  ];
}

export function createRandomSocialPost(uniqueId: string, bodyIndex: number): SocialPost {
  const author = createRandomContact(`author-${uniqueId}`, bodyIndex);
  const withImage = bodyIndex % 2 === 0;
  return {
    id: uniqueId,
    author,
    body: SOCIAL_BODIES[bodyIndex % SOCIAL_BODIES.length],
    imageUrl: withImage
      ? SOCIAL_IMAGES[bodyIndex % SOCIAL_IMAGES.length]
      : undefined,
    timestamp: 'Just now',
    likes: Math.floor(Math.random() * 40),
    comments: Math.floor(Math.random() * 12),
    shares: Math.floor(Math.random() * 6),
    liked: false,
  };
}

export function createRandomTimelinePost(uniqueId: string, bodyIndex: number): TimelinePost {
  const author = createRandomContact(`author-${uniqueId}`, bodyIndex);
  return {
    id: uniqueId,
    author,
    handle: contactHandle(author.name),
    body: TIMELINE_BODIES[bodyIndex % TIMELINE_BODIES.length],
    timestamp: 'Now',
    likes: Math.floor(Math.random() * 200),
    reposts: Math.floor(Math.random() * 40),
    replies: Math.floor(Math.random() * 25),
    liked: false,
    reposted: false,
  };
}
