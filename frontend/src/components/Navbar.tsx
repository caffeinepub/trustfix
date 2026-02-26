import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Menu, X, Search, Phone } from 'lucide-react';
import { useSearchServices } from '../hooks/useSearchServices';

const WHATSAPP_URL = 'https://wa.me/918884447229';

const navLinks = [
  { label: 'Home', to: '/' as const },
  { label: 'Services', to: '/services' as const },
  { label: 'Book Now', to: '/booking' as const },
  { label: 'Reviews', to: '/reviews' as const },
  { label: 'Contact', to: '/contact' as const },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const searchResults = useSearchServices(searchQuery);

  const handleSearchSelect = (categoryId: string) => {
    setSearchQuery('');
    setShowSearch(false);
    const url = new URL(window.location.href);
    url.pathname = '/services';
    url.searchParams.set('category', categoryId);
    window.location.href = url.toString();
  };

  const handleCallClick = () => {
    window.open(WHATSAPP_URL, '_blank');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img
              src="https://i.postimg.cc/52PW5DQj/logo.png"
              alt="TrustFix"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-brand-blue rounded-lg hover:bg-brand-blue/5 transition-colors"
                activeProps={{ className: 'px-3 py-2 text-sm font-medium text-brand-blue bg-brand-blue/5 rounded-lg' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 text-gray-500 hover:text-brand-blue rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Search services"
              >
                <Search size={18} />
              </button>
              {showSearch && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 z-50">
                  <div className="p-3">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search services..."
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
                      autoFocus
                    />
                  </div>
                  {searchResults.length > 0 && (
                    <div className="max-h-60 overflow-y-auto border-t border-gray-100">
                      {searchResults.map((result) => (
                        <button
                          key={result.id}
                          onClick={() => handleSearchSelect(result.categoryId)}
                          className="w-full text-left px-4 py-2.5 hover:bg-gray-50 transition-colors"
                        >
                          <div className="text-sm font-medium text-gray-800">{result.name}</div>
                          <div className="text-xs text-gray-500">{result.category}</div>
                        </button>
                      ))}
                    </div>
                  )}
                  {searchQuery && searchResults.length === 0 && (
                    <div className="px-4 py-3 text-sm text-gray-500 border-t border-gray-100">
                      No services found
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Call/WhatsApp button */}
            <button
              onClick={handleCallClick}
              className="hidden sm:flex items-center gap-2 bg-brand-blue text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-brand-blue/90 transition-colors"
            >
              <Phone size={15} />
              <span>8884447229</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-brand-blue rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-brand-blue hover:bg-brand-blue/5 rounded-lg transition-colors"
                activeProps={{ className: 'block px-4 py-2.5 text-sm font-medium text-brand-blue bg-brand-blue/5 rounded-lg' }}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 px-4">
              <button
                onClick={handleCallClick}
                className="w-full flex items-center justify-center gap-2 bg-brand-blue text-white text-sm font-semibold px-4 py-2.5 rounded-full hover:bg-brand-blue/90 transition-colors"
              >
                <Phone size={15} />
                Call: 8884447229
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
