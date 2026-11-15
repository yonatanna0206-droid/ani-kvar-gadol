import { useState, useEffect } from 'react';
import { Search, Bell, LogOut, LogIn, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onSearch: (query: string) => void;
  onOpenAuth: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSearch,
  onOpenAuth,
  activeTab,
  setActiveTab,
}) => {
  const { user, logout, isFirebaseConnected } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
    setShowSearch(false);
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'tv-shows', label: 'TV Shows' },
    { id: 'movies', label: 'Movies' },
    { id: 'new-popular', label: 'New & Popular' },
    { id: 'my-list', label: 'My List' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        isScrolled ? 'bg-[#141414]/95 backdrop-blur-md shadow-lg' : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
        {/* Brand & Navigation */}
        <div className="flex items-center gap-8">
          <div
            onClick={() => setActiveTab('home')}
            className="cursor-pointer text-red-600 font-black text-2xl md:text-3xl tracking-wider select-none"
          >
            NETFLIX
          </div>

          <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`transition-colors cursor-pointer ${
                  activeTab === link.id
                    ? 'text-white font-semibold'
                    : 'text-zinc-300 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Search, Status & Profile Actions */}
        <div className="flex items-center gap-4 text-white">
          {/* Search Box */}
          <div className="relative flex items-center">
            {showSearch ? (
              <div className="flex items-center bg-black/70 border border-zinc-600 rounded-full px-3 py-1.5 transition-all">
                <Search className="w-4 h-4 text-zinc-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Titles, genres, cast..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  autoFocus
                  className="bg-transparent text-sm text-white placeholder-zinc-400 outline-none w-36 sm:w-60"
                />
                <button onClick={clearSearch} className="cursor-pointer text-zinc-400 hover:text-white ml-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="p-1.5 hover:text-red-500 transition-colors cursor-pointer"
                title="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Firebase Connection Status Indicator */}
          <div
            title={isFirebaseConnected ? 'Firebase Connected' : 'Firebase Demo/Mock Mode'}
            className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded text-xs bg-zinc-800/80 border border-zinc-700 select-none"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isFirebaseConnected ? 'bg-emerald-500' : 'bg-amber-400'
              }`}
            />
            <span className="text-zinc-300">
              {isFirebaseConnected ? 'Firebase' : 'Demo'}
            </span>
          </div>

          {/* Notifications */}
          <button className="hidden sm:block p-1.5 hover:text-red-500 transition-colors cursor-pointer">
            <Bell className="w-5 h-5" />
          </button>

          {/* User Profile / Auth Toggle */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-zinc-800/50"
              >
                <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center font-bold text-sm text-white shadow">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                </div>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-md shadow-xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-zinc-800 text-xs text-zinc-400">
                    Signed in as:
                    <div className="font-semibold text-white truncate">
                      {user.displayName || user.email || 'Viewer'}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('my-list');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  >
                    My Watchlist
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-zinc-800 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded cursor-pointer transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Mobile nav links */}
      <div className="md:hidden flex items-center justify-around py-2 border-t border-zinc-800 bg-[#141414]/90 text-xs">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => setActiveTab(link.id)}
            className={`cursor-pointer ${
              activeTab === link.id ? 'text-red-500 font-bold' : 'text-zinc-400'
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>
    </header>
  );
};
