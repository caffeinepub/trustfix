import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Phone, Menu, X } from 'lucide-react';
import { PHONE_NUMBER, WHATSAPP_NUMBER } from '../data/services';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Reviews', path: '/reviews' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-brand-blue shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate({ to: '/' })}
            className="flex items-center gap-2 focus:outline-none"
          >
            <img
              src="/assets/generated/trustfix-logo.dim_400x120.png"
              alt="TrustFix"
              className="h-10 w-auto object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <span className="text-white font-bold text-xl tracking-tight">TrustFix</span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-white/90 hover:text-white font-medium transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Phone */}
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="hidden md:flex items-center gap-2 bg-white text-brand-blue font-bold px-4 py-2 rounded-full text-sm hover:bg-blue-50 transition-colors"
          >
            <Phone size={16} />
            {PHONE_NUMBER}
          </a>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-blue-dark border-t border-white/20">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block text-white/90 hover:text-white font-medium py-2 text-sm"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex items-center gap-2 text-white font-bold py-2 text-sm"
            >
              <Phone size={16} />
              {PHONE_NUMBER}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
