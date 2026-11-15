import type { Movie, MovieCategory } from '../types/movie';

export const mockMovies: Movie[] = [
  {
    id: 'sintel-1',
    title: 'Sintel: The Dragon Girl',
    description:
      'A lonely young woman named Sintel searches relentlessly across dangerous frozen mountains and ancient ruins for a pet baby dragon she rescued and befriended.',
    backdropUrl:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
    posterUrl:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    duration: '15m',
    releaseYear: 2024,
    ageRating: 'PG-13',
    matchScore: 98,
    genres: ['Fantasy', 'Adventure', 'Animation'],
    isTrending: true,
    isOriginal: true,
    cast: ['Halina Reijn', 'Thom Hoffman'],
  },
  {
    id: 'tears-of-steel-2',
    title: 'Tears of Steel',
    description:
      'In a dystopian future, a group of rebel warriors and scientists gather at the Oude Kerk in Amsterdam to stage a desperate technological counter-attack against sentient robots.',
    backdropUrl:
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80',
    posterUrl:
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    duration: '12m',
    releaseYear: 2023,
    ageRating: 'TV-14',
    matchScore: 94,
    genres: ['Sci-Fi', 'Action', 'Cyberpunk'],
    isTrending: true,
    isOriginal: false,
    cast: ['Derek de Lint', 'Sergio Hasselbaink', 'Rogier Schippers'],
  },
  {
    id: 'big-buck-bunny-3',
    title: 'Big Buck Bunny: Forest Defense',
    description:
      'A large and lovable rabbit wakes up to a sunny forest morning, only to be challenged by bullying flying squirrels and a mischievous red squirrel.',
    backdropUrl:
      'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&w=1600&q=80',
    posterUrl:
      'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&w=600&q=80',
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: '10m',
    releaseYear: 2024,
    ageRating: 'TV-G',
    matchScore: 91,
    genres: ['Animation', 'Comedy', 'Family'],
    isTrending: true,
    isOriginal: true,
    cast: ['Bunny', 'Frank', 'Rinky', 'Gimera'],
  },
  {
    id: 'elephants-dream-4',
    title: 'Elephants Dream: The Machine',
    description:
      'Two explorers navigate the bizarre and unpredictable inner mechanics of an endless organic machine that reflects their deepest subconscious thoughts.',
    backdropUrl:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
    posterUrl:
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=600&q=80',
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: '11m',
    releaseYear: 2023,
    ageRating: 'TV-PG',
    matchScore: 89,
    genres: ['Sci-Fi', 'Mystery', 'Surreal'],
    isTrending: false,
    isOriginal: false,
    cast: ['Tygo Gernandt', 'Cas Jansen'],
  },
  {
    id: 'for-bigger-blazes-5',
    title: 'Wildfire Horizons',
    description:
      'Elite smokejumpers and tactical pilots risk everything on the frontlines to contain the fiercest wildfires across mountainous terrain.',
    backdropUrl:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    posterUrl:
      'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80',
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '15m',
    releaseYear: 2025,
    ageRating: 'PG-13',
    matchScore: 96,
    genres: ['Action', 'Thriller', 'Drama'],
    isTrending: true,
    isOriginal: true,
    cast: ['Marcus Cole', 'Sarah Jenkins'],
  },
  {
    id: 'for-bigger-escapes-6',
    title: 'Extreme Expeditions: Iceland',
    description:
      'Journey through majestic glaciers, subterranean volcanic caves, and neon auroras with world-class backcountry survivalists.',
    backdropUrl:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    posterUrl:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: '15m',
    releaseYear: 2024,
    ageRating: 'TV-G',
    matchScore: 92,
    genres: ['Documentary', 'Nature', 'Travel'],
    isTrending: false,
    isOriginal: false,
    cast: ['Frederik Lind', 'Elin Vance'],
  },
  {
    id: 'for-bigger-fun-7',
    title: 'Neon Odyssey',
    description:
      'In a high-tech metropolis powered by neural networks, a renegade coder uncovers a virtual conspiracy threatening both dimensions.',
    backdropUrl:
      'https://images.unsplash.com/photo-1519638399535-1b036603ac77?auto=format&fit=crop&w=1600&q=80',
    posterUrl:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    duration: '15m',
    releaseYear: 2025,
    ageRating: 'TV-14',
    matchScore: 97,
    genres: ['Sci-Fi', 'Cyberpunk', 'Mystery'],
    isTrending: true,
    isOriginal: true,
    cast: ['Kenji Sato', 'Mia Torres'],
  },
  {
    id: 'for-bigger-joyrides-8',
    title: 'Apex Velocity: The Grand Prix',
    description:
      'Go behind the paddock with elite Formula drivers as rivalries heat up on the world’s most perilous street circuits.',
    backdropUrl:
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1600&q=80',
    posterUrl:
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=600&q=80',
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    duration: '15m',
    releaseYear: 2024,
    ageRating: 'TV-MA',
    matchScore: 95,
    genres: ['Action', 'Sports', 'Documentary'],
    isTrending: true,
    isOriginal: false,
    cast: ['Carlos Sterling', 'Maxime Laurent'],
  },
];

export const mockCategories: MovieCategory[] = [
  {
    id: 'trending',
    title: 'Trending Now',
    movies: mockMovies.filter((m) => m.isTrending),
  },
  {
    id: 'top-rated',
    title: 'Top Rated & Critically Acclaimed',
    movies: [...mockMovies].sort((a, b) => b.matchScore - a.matchScore),
  },
  {
    id: 'scifi',
    title: 'Sci-Fi & Futuristic Thrillers',
    movies: mockMovies.filter((m) => m.genres.includes('Sci-Fi')),
  },
  {
    id: 'action',
    title: 'Action & Adventure',
    movies: mockMovies.filter((m) => m.genres.includes('Action') || m.genres.includes('Adventure')),
  },
  {
    id: 'animation',
    title: 'Animation & Family',
    movies: mockMovies.filter((m) => m.genres.includes('Animation')),
  },
];
