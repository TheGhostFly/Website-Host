import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router';

const NAV_LINKS = [
  { label: 'ABOUT', href: '#about' },
  { label: 'WORK', href: '#work' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'TOOLS', href: '#tools' },
  { label: 'BLOG', href: '#blog' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  // Only show nav on home page
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (!isHomePage) return;

    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHomePage]);

  useEffect(() => {
    if (!isHomePage) return;

    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('#' + entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -60% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHomePage]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setIsMobileOpen(false);
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    []
  );

  // Don't render nav if not on home page
  if (!isHomePage) return null;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          isScrolled
            ? 'bg-near-black/80 backdrop-blur-md border-b border-white-primary/5'
            : 'bg-transparent'
        }`}
      >
        <div className="container-main flex items-center justify-between py-5 md:py-6">
          {/* Logo */}
          <Link
            to="/"
            className="font-dm font-bold text-lg tracking-[0.12em] text-white-primary"
          >
            KOSH
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`nav-label ${activeSection === link.href ? 'active' : ''}`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="font-dm text-xs font-medium uppercase tracking-[0.06em] bg-gold text-near-black px-6 py-2.5 rounded transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 p-2 relative"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-[2px] bg-gold transition-all duration-300 ${
                isMobileOpen ? 'rotate-45 translate-y-[1px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-gold mt-1 transition-all duration-300 ${
                isMobileOpen ? '-rotate-45 -translate-y-[1px]' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-[999] bg-near-black transition-all duration-500 md:hidden ${
          isMobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-dm text-2xl font-medium text-white-primary/70 hover:text-gold transition-all duration-300"
              style={{
                transitionDelay: isMobileOpen ? `${i * 60}ms` : '0ms',
                transform: isMobileOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMobileOpen ? 1 : 0,
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="mt-4 font-dm text-sm font-medium uppercase tracking-[0.06em] bg-gold text-near-black px-8 py-3 rounded"
            style={{
              transitionDelay: isMobileOpen ? `${NAV_LINKS.length * 60}ms` : '0ms',
              transform: isMobileOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: isMobileOpen ? 1 : 0,
              transition: 'all 0.4s ease',
            }}
          >
            Hire Me
          </a>
        </div>
      </div>
    </>
  );
}
