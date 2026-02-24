import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from '@tanstack/react-router';
import { Menu, X, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useSearchServices } from '@/hooks/useSearchServices';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { searchResults, isSearching } = useSearchServices(searchQuery);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/booking', label: 'Booking' },
    { path: '/contact', label: 'Contact' },
    { path: '/reviews', label: 'Reviews' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSearchResultClick = (serviceId: string, category: string) => {
    setSearchQuery('');
    setIsMobileMenuOpen(false);
    navigate({ to: '/services', search: { serviceId, category } });
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-lg shadow-lg'
          : 'bg-white/60 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/assets/file_00000000d2747206831923d1f7e53476.png"
              alt="TrustFix Logo"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-trustfix-green'
                    : 'text-gray-700 hover:text-trustfix-orange'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:block relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-trustfix-green"
              />
            </div>

            {/* Search Results Dropdown */}
            {searchQuery && searchResults.length > 0 && (
              <div 
                className="absolute top-full mt-2 w-full bg-white/95 backdrop-blur-lg rounded-lg shadow-xl border border-gray-200 max-h-[260px] overflow-y-auto z-[9999]"
                style={{
                  WebkitOverflowScrolling: 'touch',
                  overscrollBehavior: 'contain',
                }}
              >
                {searchResults.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleSearchResultClick(result.id, result.category)}
                    className="w-full text-left px-4 py-3 hover:bg-trustfix-green/10 transition-colors border-b border-gray-100 last:border-0"
                  >
                    <div className="font-medium text-gray-900">{result.name}</div>
                    <div className="text-sm text-gray-500">{result.category}</div>
                    <div className="text-xs text-gray-400 mt-1 line-clamp-1">{result.description}</div>
                  </button>
                ))}
              </div>
            )}

            {searchQuery && searchResults.length === 0 && !isSearching && (
              <div className="absolute top-full mt-2 w-full bg-white/95 backdrop-blur-lg rounded-lg shadow-xl border border-gray-200 px-4 py-3 z-[9999]">
                <p className="text-sm text-gray-500">No services found</p>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? 'text-trustfix-green'
                      : 'text-gray-700 hover:text-trustfix-orange'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Search */}
              <div className="relative pt-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full bg-white/80 backdrop-blur-sm border-gray-200"
                />

                {/* Mobile Search Results */}
                {searchQuery && searchResults.length > 0 && (
                  <div 
                    className="mt-2 bg-white/95 backdrop-blur-lg rounded-lg shadow-xl border border-gray-200 max-h-[260px] overflow-y-auto z-[9999]"
                    style={{
                      WebkitOverflowScrolling: 'touch',
                      overscrollBehavior: 'contain',
                    }}
                  >
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => handleSearchResultClick(result.id, result.category)}
                        className="w-full text-left px-4 py-3 hover:bg-trustfix-green/10 transition-colors border-b border-gray-100 last:border-0"
                      >
                        <div className="font-medium text-gray-900">{result.name}</div>
                        <div className="text-sm text-gray-500">{result.category}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
