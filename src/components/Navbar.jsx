import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { projectData } from '../data/projectData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { label: "About Me", to: "/#about" },
    ...projectData.map(p => ({ label: p.title, to: `/project/${p.slug}` })),
    { label: "Contact", to: "/#contact" }
  ];

  const handleNavClick = (to) => {
    if (to.startsWith('/#')) {
      const id = to.replace('/#', '');
      if (location.pathname === '/') {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = to;
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-lg border-b border-white/5 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-textPrimary hover:text-primary transition-colors">
          Kimmie Huynh
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link, i) => (
            link.to.startsWith('/#') ? (
              <button
                key={i}
                onClick={() => handleNavClick(link.to)}
                className="px-3 py-2 text-sm text-textSecondary hover:text-textPrimary transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={i}
                to={link.to}
                className={`px-3 py-2 text-sm transition-colors rounded-lg hover:bg-white/5 ${
                  location.pathname === link.to ? 'text-primary font-medium' : 'text-textSecondary hover:text-textPrimary'
                }`}
              >
                {link.label}
              </Link>
            )
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-textSecondary hover:text-textPrimary transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-surface/95 backdrop-blur-lg border-t border-white/5">
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link, i) => (
              link.to.startsWith('/#') ? (
                <button
                  key={i}
                  onClick={() => { handleNavClick(link.to); setIsOpen(false); }}
                  className="block w-full text-left px-4 py-3 text-textSecondary hover:text-textPrimary hover:bg-white/5 rounded-lg transition-colors"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={i}
                  to={link.to}
                  className={`block px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === link.to ? 'text-primary bg-primary/10 font-medium' : 'text-textSecondary hover:text-textPrimary hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
