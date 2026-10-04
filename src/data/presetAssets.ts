export interface PresetPoster {
  id: string;
  name: string;
  genre: string;
  posterUrl: string;
  backdropUrl: string;
}

export const PRESET_FILM_ASSETS: PresetPoster[] = [
  {
    id: 'preset-sci-fi-void',
    name: 'Deep Space Anomaly',
    genre: 'Sci-Fi',
    posterUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&auto=format&fit=crop&q=80'
  },
  {
    id: 'preset-neon-noir',
    name: 'Cyber Noir City',
    genre: 'Thriller',
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1600&auto=format&fit=crop&q=80'
  },
  {
    id: 'preset-horror-dark',
    name: 'The Hollow Woods',
    genre: 'Horror',
    posterUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=800&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80'
  },
  {
    id: 'preset-desert-action',
    name: 'Scorched Outlaw',
    genre: 'Action',
    posterUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?w=1600&auto=format&fit=crop&q=80'
  },
  {
    id: 'preset-coastal-drama',
    name: 'Echoes of the Coast',
    genre: 'Drama',
    posterUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop&q=80'
  },
  {
    id: 'preset-underwater-mystery',
    name: 'Abyssal Current',
    genre: 'Mystery',
    posterUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=1600&auto=format&fit=crop&q=80'
  }
];

export const DEMO_TRAILER_URLS = [
  { label: 'Cinematic High Voltage Trailer', url: 'https://www.youtube.com/embed/84qX3oUjE5w' },
  { label: 'Supernatural Horror Trailer', url: 'https://www.youtube.com/embed/ZuQuOnYnr3Q' },
  { label: 'High Octane Action Teaser', url: 'https://www.youtube.com/embed/d2k43454EXs' },
  { label: 'Sci-Fi Psychological Teaser', url: 'https://www.youtube.com/embed/twuScTcDP_Q' },
  { label: 'Dramatic Screenlife Mystery', url: 'https://www.youtube.com/embed/seBixtcx19E' }
];
