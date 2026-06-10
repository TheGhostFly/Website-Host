export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-near-black border-t border-white-primary/[0.06] py-8">
      <div className="container-main">
        <div className="flex flex-col items-center gap-4">
          {/* Copyright */}
          <p className="font-dm text-xs text-white-primary/30 text-center">
            &copy; 2025 Kosh. Built with words & curiosity.
          </p>

          {/* Nav links */}
          <div className="flex items-center gap-3">
            {['ABOUT', 'WORK', 'CONTACT'].map((label, i) => (
              <span key={label} className="flex items-center gap-3">
                {i > 0 && (
                  <span className="text-white-primary/20">&middot;</span>
                )}
                <a
                  href={`#${label.toLowerCase()}`}
                  onClick={(e) => handleNavClick(e, `#${label.toLowerCase()}`)}
                  className="font-dm text-[10px] font-medium uppercase tracking-[0.08em] text-white-primary/25 hover:text-gold transition-colors duration-300"
                >
                  {label}
                </a>
              </span>
            ))}
          </div>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-10 h-10 rounded-full border border-white-primary/15 flex items-center justify-center text-white-primary/40 hover:text-gold hover:border-gold transition-all duration-300 z-50"
          aria-label="Back to top"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
