import { Film, CreatorUser } from '../types';

export const INITIAL_CREATORS: CreatorUser[] = [
  {
    id: 'creator-1',
    name: 'Elena Rostova',
    email: 'elena.rostova@midnightcine.io',
    role: 'Director',
    company: 'Midnight Horizon Pictures',
    bio: 'Independent genre filmmaker specializing in psychological thrillers and atmospheric sci-fi cinema.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    isVerified: true,
    createdFilmsCount: 2,
    joinedDate: '2024-03-15',
  },
  {
    id: 'creator-2',
    name: 'Marcus Vance',
    email: 'marcus@blackwoodproductions.la',
    role: 'Producer',
    company: 'Blackwood Media & Acquisitions',
    bio: 'Veteran indie producer bringing elevated horror and dark fantasy narratives to global audiences.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    isVerified: true,
    createdFilmsCount: 3,
    joinedDate: '2023-11-04',
  },
  {
    id: 'creator-3',
    name: 'Chloe Tanaka',
    email: 'chloe.tanaka@neo-tokyo.org',
    role: 'Screenwriter',
    company: 'Kuro Studio',
    bio: 'Award-winning screenwriter known for high-concept neo-noir and speculative tech dramas.',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
    isVerified: true,
    createdFilmsCount: 1,
    joinedDate: '2024-01-20',
  }
];

export const STAGE_6_FILMS: Film[] = [
  {
    id: 'paddington-in-peru',
    title: 'Paddington in Peru',
    slug: 'paddington-in-peru',
    tagline: 'Adventure is a family tradition.',
    synopsis: 'Paddington returns to Peru to visit his beloved Aunt Lucy, who now resides at the Home for Retired Bears. With the Brown Family in tow, a thrilling adventure ensues when a mystery plunges them into an unexpected journey through the Amazon rainforest and up to the mountain peaks of Peru.',
    releaseYear: 2025,
    rating: 'PG',
    runtimeMinutes: 106,
    genres: ['Comedy', 'Action', 'Indie'],
    releaseStatus: 'in_theaters',
    releaseDateText: 'Now In Theaters & On Demand',
    posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/84qX3oUjE5w',
    director: 'Dougal Wilson',
    writers: ['Mark Burton', 'Jon Foster', 'James Lamont'],
    producers: ['David Heyman', 'Rosie Alison'],
    cast: ['Ben Whishaw', 'Hugh Bonneville', 'Emily Mortimer', 'Antonio Banderas', 'Olivia Colman'],
    studio: 'StudioCanal / Heyday Films',
    distributor: 'Hulu Production. New York / Stage Films',
    laurels: ['Official Selection - London Film Festival', 'BAFTA Nominee for Best Family Feature'],
    technicalSpecs: {
      aspectRatio: '2.39:1 Anamorphic',
      soundMix: 'Dolby Atmos / 7.1 Surround',
      camera: 'Arri Alexa Mini LF',
      color: 'Color (ACES Workflow)',
      runtimeMinutes: 106
    },
    watchLinks: {
      sonyPicturesStore: 'https://www.hulu.com',
      appleTv: 'https://tv.apple.com',
      amazonPrime: 'https://amazon.com/movies',
      fandango: 'https://fandango.com',
      moviesAnywhere: 'https://moviesanywhere.com'
    },
    reviews: [
      { critic: 'Robbie Collin', publication: 'The Telegraph', quote: 'A joyous, wonderfully imaginative triumph that expands the beloved world.' },
      { critic: 'Clarisse Loughrey', publication: 'The Independent', quote: 'Charming, visually inventive, and delightfully warm-hearted.' }
    ],
    isFeatured: true,
    isStage6Original: true,
    createdAt: '2025-01-10'
  },
  {
    id: 'a-big-bold-beautiful-journey',
    title: 'A Big Bold Beautiful Journey',
    slug: 'a-big-bold-beautiful-journey',
    tagline: 'Some journeys happen in the blink of a heart.',
    synopsis: 'An imaginative tale of two strangers and the unbelievable journey that connects them across time, memories, and unexpected cross-country encounters.',
    releaseYear: 2025,
    rating: 'PG-13',
    runtimeMinutes: 118,
    genres: ['Drama', 'Sci-Fi', 'Comedy'],
    releaseStatus: 'coming_soon',
    releaseDateText: 'Coming Soon to Cinemas Worldwide',
    posterUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    director: 'Kogonada',
    writers: ['Seth Reiss'],
    producers: ['Dan Friedkin', 'Bradley Thomas', 'Ryan Friedkin', 'Youree Henley'],
    cast: ['Margot Robbie', 'Colin Farrell', 'Lily Rabe', 'Jodie Turner-Smith', 'Phoebe Waller-Bridge'],
    studio: 'Imperative Entertainment / 30WEST',
    distributor: 'Hulu Production. New York / Stage Films',
    laurels: ['Official Selection - Cannes Premiere', 'AFI Fest Spotlight Feature'],
    technicalSpecs: {
      aspectRatio: '1.85:1 Flat',
      soundMix: 'Dolby Atmos',
      camera: 'Arri Alexa 35',
      color: 'Color / Technicolor',
      runtimeMinutes: 118
    },
    watchLinks: {
      sonyPicturesStore: 'https://www.hulu.com',
      fandango: 'https://fandango.com'
    },
    reviews: [
      { critic: 'David Ehrlich', publication: 'IndieWire', quote: 'A sublime and deeply poetic work showcasing breathtaking chemistry.' }
    ],
    isFeatured: true,
    isStage6Original: true,
    createdAt: '2025-02-01'
  },
  {
    id: 'insidious-the-red-door',
    title: 'Insidious: The Red Door',
    slug: 'insidious-the-red-door',
    tagline: 'It ends where it all began.',
    synopsis: 'To put their demons to rest once and for all, Josh Lambert and a college-aged Dalton Lambert must go deeper into The Further than ever before, facing their family\'s dark past and a host of new and more horrifying terrors that lurk behind the red door.',
    releaseYear: 2023,
    rating: 'PG-13',
    runtimeMinutes: 107,
    genres: ['Horror', 'Mystery', 'Thriller'],
    releaseStatus: 'digital_vod',
    releaseDateText: 'Now on 4K Ultra HD™, Blu-ray™ and Digital',
    posterUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=800&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/ZuQuOnYnr3Q',
    director: 'Patrick Wilson',
    writers: ['Scott Teems', 'Leigh Whannell'],
    producers: ['Jason Blum', 'Oren Peli', 'James Wan', 'Leigh Whannell'],
    cast: ['Patrick Wilson', 'Ty Simpkins', 'Rose Byrne', 'Andrew Astor', 'Lin Shaye'],
    studio: 'Blumhouse Productions / Atomic Monster',
    distributor: 'Hulu Production. New York / Stage Films',
    laurels: ['#1 Worldwide Box Office Debut in Horror', 'Fangoria Chainsaw Nominee'],
    technicalSpecs: {
      aspectRatio: '2.39:1 Scope',
      soundMix: 'Dolby Digital / DTS:X',
      camera: 'Arri Alexa Mini',
      color: 'Color / Deluxe',
      runtimeMinutes: 107
    },
    watchLinks: {
      sonyPicturesStore: 'https://www.hulu.com',
      appleTv: 'https://tv.apple.com',
      amazonPrime: 'https://amazon.com',
      fandango: 'https://fandango.com',
      moviesAnywhere: 'https://moviesanywhere.com'
    },
    reviews: [
      { critic: 'Meagan Navarro', publication: 'Bloody Disgusting', quote: 'Patrick Wilson directs with confidence and palpable affection for the Lambert mythology.' }
    ],
    isFeatured: true,
    isStage6Original: true,
    createdAt: '2023-07-07'
  },
  {
    id: 'sisu',
    title: 'Sisu',
    slug: 'sisu',
    tagline: 'Witness the man who refused to die.',
    synopsis: 'During the desperate final days of WWII, a solitary gold prospector crosses paths with Nazi soldiers on a scorched-earth retreat in northern Finland. When the soldiers steal his gold, they quickly discover they just tangled with no ordinary miner.',
    releaseYear: 2023,
    rating: 'R',
    runtimeMinutes: 91,
    genres: ['Action', 'Thriller', 'Indie'],
    releaseStatus: 'bluray_physical',
    releaseDateText: 'Available on 4K UHD, Blu-ray & Digital',
    posterUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?w=1600&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/d2k43454EXs',
    director: 'Jalmari Helander',
    writers: ['Jalmari Helander'],
    producers: ['Petri Jokiranta'],
    cast: ['Jorma Tommila', 'Aksel Hennie', 'Jack Doolan', 'Mimosa Willamo', 'Onni Tommila'],
    studio: 'Subzero Film Entertainment / Good Chaos',
    distributor: 'Hulu Production. New York / Stage Films',
    laurels: ['Winner - Best Motion Picture, Sitges Film Festival', 'Winner - Best Actor, Sitges Film Festival'],
    technicalSpecs: {
      aspectRatio: '2.39:1 Anamorphic',
      soundMix: 'Dolby Atmos',
      camera: 'Red Monstro 8K VV',
      color: 'Color / ACES',
      runtimeMinutes: 91
    },
    watchLinks: {
      appleTv: 'https://tv.apple.com',
      amazonPrime: 'https://amazon.com',
      fandango: 'https://fandango.com'
    },
    reviews: [
      { critic: 'Matt Donato', publication: 'IGN', quote: 'A gloriously bloody, unhinged action masterclass that delivers pure adrenaline.' }
    ],
    isFeatured: true,
    isStage6Original: true,
    createdAt: '2023-04-28'
  },
  {
    id: 'evil-dead-rise',
    title: 'Evil Dead Rise',
    slug: 'evil-dead-rise',
    tagline: 'Mommy loves you to death.',
    synopsis: 'A twisted tale of two estranged sisters whose reunion is cut short by the rise of flesh-possessing demons, thrusting them into a primal battle for survival as they face the most nightmarish version of family imaginable.',
    releaseYear: 2023,
    rating: 'R',
    runtimeMinutes: 96,
    genres: ['Horror', 'Thriller'],
    releaseStatus: 'digital_vod',
    releaseDateText: 'Now Streaming & on 4K Digital',
    posterUrl: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=800&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1600&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/smTK_AeAPHs',
    director: 'Lee Cronin',
    writers: ['Lee Cronin'],
    producers: ['Rob Tapert', 'Sam Raimi', 'Bruce Campbell'],
    cast: ['Lily Sullivan', 'Alyssa Sutherland', 'Morgan Davies', 'Gabrielle Echols', 'Nell Fisher'],
    studio: 'Ghost House Pictures / New Line Cinema',
    distributor: 'Warner Bros. Pictures / Stage Films (Acquisitions)',
    laurels: ['SXSW Film Festival Headliner', 'Empire Award for Best Horror'],
    technicalSpecs: {
      aspectRatio: '2.39:1',
      soundMix: 'Dolby Atmos',
      camera: 'Arri Alexa Mini LF',
      color: 'Color',
      runtimeMinutes: 96
    },
    watchLinks: {
      appleTv: 'https://tv.apple.com',
      amazonPrime: 'https://amazon.com',
      fandango: 'https://fandango.com'
    },
    reviews: [
      { critic: 'Katie Rife', publication: 'Rolling Stone', quote: 'A relentlessly vicious thrill ride with blood-soaked invention.' }
    ],
    isFeatured: false,
    isStage6Original: false,
    createdAt: '2023-04-21'
  },
  {
    id: 'dumb-money',
    title: 'Dumb Money',
    slug: 'dumb-money',
    tagline: 'The ultimate David vs. Goliath stock market battle.',
    synopsis: 'The insane true story of everyday people who flipped the script on Wall Street and got rich by turning GameStop into the world\'s hottest company, igniting a viral revolution that shook hedge funds to their core.',
    releaseYear: 2023,
    rating: 'R',
    runtimeMinutes: 105,
    genres: ['Comedy', 'Drama'],
    releaseStatus: 'digital_vod',
    releaseDateText: 'Available on Digital & Blu-ray™',
    posterUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1600&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/22sV1_dG684',
    director: 'Craig Gillespie',
    writers: ['Lauren Schuker Blum', 'Rebecca Angelo'],
    producers: ['Aaron Ryder', 'Teddy Schwarzman', 'Craig Gillespie'],
    cast: ['Paul Dano', 'Pete Davidson', 'Vincent D\'Onofrio', 'America Ferrera', 'Nick Offerman', 'Seth Rogen'],
    studio: 'Black Bear Pictures / Ryder Picture Company',
    distributor: 'Hulu Production. New York / Stage Films',
    laurels: ['Official Selection - Toronto International Film Festival'],
    technicalSpecs: {
      aspectRatio: '2.39:1 Scope',
      soundMix: 'Dolby 5.1 / Atmos',
      camera: 'Arri Alexa Mini LF',
      color: 'Color',
      runtimeMinutes: 105
    },
    watchLinks: {
      sonyPicturesStore: 'https://www.hulu.com',
      appleTv: 'https://tv.apple.com',
      amazonPrime: 'https://amazon.com'
    },
    reviews: [
      { critic: 'Peter Debruge', publication: 'Variety', quote: 'A crowd-pleasing, energetic comedy that captures modern digital defiance.' }
    ],
    isFeatured: false,
    isStage6Original: true,
    createdAt: '2023-09-22'
  },
  {
    id: 'missing-2023',
    title: 'Missing',
    slug: 'missing',
    tagline: 'No one goes missing without a trace.',
    synopsis: 'When her mother disappears while on vacation in Colombia with her new boyfriend, June\'s search for answers is hindered by international red tape. Stuck thousands of miles away in Los Angeles, June creatively uses all the latest technology at her fingertips to try and find her before it\'s too late.',
    releaseYear: 2023,
    rating: 'PG-13',
    runtimeMinutes: 111,
    genres: ['Mystery', 'Thriller', 'Drama'],
    releaseStatus: 'digital_vod',
    releaseDateText: 'Now on Digital & Blu-ray™',
    posterUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/seBixtcx19E',
    director: 'Will Merrick, Nick Johnson',
    writers: ['Will Merrick', 'Nick Johnson', 'Sev Ohanian', 'Aneesh Chaganty'],
    producers: ['Natalie Qasabian', 'Sev Ohanian', 'Aneesh Chaganty'],
    cast: ['Storm Reid', 'Joaquim de Almeida', 'Ken Leung', 'Amy Landecker', 'Daniel Henney', 'Nia Long'],
    studio: 'Stage Films / Hulu Originals / Bazelevs Company',
    distributor: 'Hulu Production. New York',
    laurels: ['Critics Choice Super Award Nominee'],
    technicalSpecs: {
      aspectRatio: '1.78:1 (Digital Screenlife)',
      soundMix: 'Dolby Digital 5.1',
      camera: 'Various Screen Capture / Digital 4K',
      color: 'Color (Rec.709)',
      runtimeMinutes: 111
    },
    watchLinks: {
      appleTv: 'https://tv.apple.com',
      amazonPrime: 'https://amazon.com',
      fandango: 'https://fandango.com'
    },
    reviews: [
      { critic: 'Brian Tallerico', publication: 'RogerEbert.com', quote: 'A remarkably slick, relentlessly engaging screenlife thriller with clever twists.' }
    ],
    isFeatured: false,
    isStage6Original: true,
    createdAt: '2023-01-20'
  },
  {
    id: 'dont-breathe',
    title: 'Don\'t Breathe',
    slug: 'dont-breathe',
    tagline: 'This house looked like an easy target. Until they stepped inside.',
    synopsis: 'Hoping to walk away with a massive fortune, a trio of thieves break into the house of a blind man who isn\'t as helpless as he seems. What starts as a simple burglary turns into a deadly game of cat and mouse in a sealed Detroit house.',
    releaseYear: 2016,
    rating: 'R',
    runtimeMinutes: 88,
    genres: ['Horror', 'Thriller', 'Action'],
    releaseStatus: 'bluray_physical',
    releaseDateText: 'Collector\'s Edition 4K UHD & Blu-ray™',
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/76yBTNDB6vU',
    director: 'Fede Álvarez',
    writers: ['Fede Álvarez', 'Rodo Sayagues'],
    producers: ['Sam Raimi', 'Rob Tapert', 'Fede Álvarez'],
    cast: ['Jane Levy', 'Dylan Minnette', 'Daniel Zovatto', 'Stephen Lang'],
    studio: 'Ghost House Pictures / Good Universe',
    distributor: 'Hulu Production. New York / Stage Films',
    laurels: ['Saturn Award for Best Horror Film', 'Empire Award for Best Thriller'],
    technicalSpecs: {
      aspectRatio: '2.39:1',
      soundMix: 'Dolby Atmos',
      camera: 'Arri Alexa XT',
      color: 'Color / Technicolor',
      runtimeMinutes: 88
    },
    watchLinks: {
      sonyPicturesStore: 'https://www.hulu.com',
      appleTv: 'https://tv.apple.com',
      amazonPrime: 'https://amazon.com'
    },
    reviews: [
      { critic: 'Peter Travers', publication: 'Rolling Stone', quote: 'A masterclass in suspense that will make you hold your breath from first frame to last.' }
    ],
    isFeatured: false,
    isStage6Original: true,
    createdAt: '2016-08-26'
  },
  {
    id: 'moon-2009',
    title: 'Moon',
    slug: 'moon',
    tagline: 'The last place you\'d ever expect to find yourself.',
    synopsis: 'Astronaut Sam Bell has a quintessentially personal encounter towards the end of his three-year stint on the Moon, where he, working alongside his computer GERTY, sends back to Earth parcels of a resource that has helped resolve our planet\'s energy problems.',
    releaseYear: 2009,
    rating: 'R',
    runtimeMinutes: 97,
    genres: ['Sci-Fi', 'Drama', 'Mystery'],
    releaseStatus: 'bluray_physical',
    releaseDateText: '4K Ultra HD & Blu-ray™ Remaster',
    posterUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/twuScTcDP_Q',
    director: 'Duncan Jones',
    writers: ['Duncan Jones', 'Nathan Parker'],
    producers: ['Stuart Fenegan', 'Trudie Styler'],
    cast: ['Sam Rockwell', 'Kevin Spacey (Voice)', 'Dominique McElligott', 'Kaya Scodelario'],
    studio: 'Liberty Films / Stage Films',
    distributor: 'Hulu Production. New York / Stage Films',
    laurels: ['BAFTA Winner for Outstanding Debut', 'Winner - British Independent Film Awards'],
    technicalSpecs: {
      aspectRatio: '2.40:1',
      soundMix: 'DTS-HD Master Audio 5.1',
      camera: 'Arricam LT',
      color: 'Color / 35mm',
      runtimeMinutes: 97
    },
    watchLinks: {
      appleTv: 'https://tv.apple.com',
      amazonPrime: 'https://amazon.com'
    },
    reviews: [
      { critic: 'Roger Ebert', publication: 'Chicago Sun-Times', quote: 'A thoughtful, philosophical science fiction classic anchored by a brilliant Sam Rockwell.' }
    ],
    isFeatured: false,
    isStage6Original: true,
    createdAt: '2009-06-12'
  },
  {
    id: 'creator-film-obsidian-drift',
    title: 'Obsidian Drift',
    slug: 'obsidian-drift',
    tagline: 'When the deep sea whispers, the silence answers back.',
    synopsis: 'A deep-sea oceanographic crew trapped in an experimental Mariana Trench subterranean station uncovers a non-terrestrial bioluminescent organism that alters the crew\'s collective subconscious.',
    releaseYear: 2025,
    rating: 'R',
    runtimeMinutes: 104,
    genres: ['Sci-Fi', 'Horror', 'Thriller'],
    releaseStatus: 'festival_circuit',
    releaseDateText: 'World Premiere - Sundance Film Festival / In Stage Films Acquisitions Review',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    director: 'Elena Rostova',
    writers: ['Elena Rostova', 'Kaelen Thorne'],
    producers: ['Marcus Vance', 'Elena Rostova'],
    cast: ['Victoria Chen', 'Aris Thorne', 'Gael Montero', 'Ingrid Dahl'],
    studio: 'Midnight Horizon Pictures / Neon Horizon Labs',
    distributor: 'Hulu Production. New York Acquisitions Pipeline',
    laurels: ['Official Selection - Sundance Midnight', 'Sitges Film Festival Fantastic Discovery Winner'],
    technicalSpecs: {
      aspectRatio: '2.39:1 DCI 4K Scope',
      soundMix: 'Dolby Atmos 7.1.4',
      camera: 'Arri Alexa 35 Underwater Housing',
      color: 'ACES Color Pipeline',
      runtimeMinutes: 104
    },
    watchLinks: {
      sonyPicturesStore: 'https://stagefilms.com/screener/obsidian-drift'
    },
    reviews: [
      { critic: 'Hollywood Reporter', publication: 'Film Review', quote: 'A suffocating, breathtakingly atmospheric triumph of practical underwater horror.' }
    ],
    isFeatured: true,
    isStage6Original: false,
    isCreatorSubmission: true,
    creatorId: 'creator-1',
    creatorName: 'Elena Rostova (Midnight Horizon Pictures)',
    screenerPasscode: 'STAGE-HORIZON',
    isScreenerProtected: true,
    screenerUrl: 'https://screener.stagefilms.com/v/obsidian-drift',
    pitchDeckNotes: 'Targeting North American theatrical and Hulu streaming release. Seeking $3.5M minimum distribution guarantee.',
    budgetTier: 'Indie ($1M - $5M)',
    createdAt: '2025-02-14',
    acquisitionsStatus: 'under_review',
    executiveFeedback: 'Hulu Production. New York Creative Board: Excellent test screening reception. Sound design & underwater cinematography praised. Final distribution agreement currently in legal triage.'
  }
];
