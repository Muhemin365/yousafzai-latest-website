import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.svg';
import { useCMSStore } from '../store/useCMSStore';

export default function Navbar() {
  const company = useCMSStore((s) => s.company) || {};
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    setScrolled(!isHome);
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  const navLinks = [
    { path: '/about', label: 'About Us' },
    { path: '/products', label: 'Products & Grades' },
    { path: '/process', label: 'Our Process' },
    { path: '/quality', label: 'Quality' },
    { path: '/contact', label: 'Contact Us' },
  ];

  const isActive = (path) => pathname === path;

  return (
    <>
      <nav className={`nav-glass ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo */}
          <Link to="/" className="nav-brand" onClick={() => setMobileOpen(false)}>
            <img
              src={logo}
              alt={company.name || 'Yousafzai Eggs Traders'}
              className="nav-logo"
            />
            <span className="nav-brand-text">
              <span className="nav-brand-name">{company.name}</span>
              {company.sub && <span className="nav-brand-sub">{company.sub}</span>}
            </span>
          </Link>

          {/* Nav Links */}
          <div className="nav-links-desktop">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link-item ${isActive(link.path) ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                <span>{link.label}</span>
                <span className={`nav-link-underline ${isActive(link.path) ? 'is-active' : ''}`} />
              </Link>
            ))}
          </div>

          {/* Right Action */}
          <div className="nav-actions">
            <Link
              to="/contact"
              className="nav-cta-btn"
              onClick={() => setMobileOpen(false)}
            >
              <span>Request Quote</span>
              <ArrowRight size={14} className="cta-arrow" />
            </Link>

            <button
              className="nav-mobile-toggle"
              aria-label="Toggle Menu"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} color="#FFFFFF" /> : <Menu size={20} color="#FFFFFF" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-drawer">
          <div className="mobile-nav-list">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="mobile-cta"
              onClick={() => setMobileOpen(false)}
            >
              <span>Request Quote</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}

      <style>{`
        /* ═══════════════════════════════════════
           NAVBAR GLASS STYLING
           ═══════════════════════════════════════ */
        .nav-glass {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 500;
          padding: 20px 0;
          background: rgba(63, 98, 49, 0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(222, 81, 10, 0.3);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .nav-glass.is-scrolled {
          padding: 12px 0;
          background: rgba(44, 71, 36, 0.96);
          border-bottom-color: rgba(222, 81, 10, 0.5);
          box-shadow: 0 10px 30px rgba(63, 98, 49, 0.35);
        }

        .nav-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .nav-logo {
          height: 50px;
          width: auto;
          display: block;
          transition: transform 0.3s;
        }

        .nav-brand-text {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }

        .nav-brand-name {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 15px;
          color: #0F172A;
        }

        .nav-brand-sub {
          font-family: monospace;
          font-size: 9px;
          color: #F59E0B;
          letter-spacing: 0.12em;
        }

        .nav-glass.is-scrolled .nav-brand-name { color: #FFFFFF; }
        .nav-glass.is-scrolled .nav-brand-sub { color: #F76B0D; }

        .nav-brand:hover .nav-logo {
          transform: scale(1.03);
        }

        /* Nav Links */
        .nav-links-desktop {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .nav-link-item {
          position: relative;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.78);
          padding: 6px 0;
          text-decoration: none;
          transition: color 0.3s;
          white-space: nowrap;
        }

        .nav-link-item:hover {
          color: #DE510A;
        }

        .nav-link-item.active {
          color: #DE510A;
          font-weight: 600;
        }

        .nav-link-underline {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #B9320D, #B9320D);
          border-radius: 2px;
          transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .nav-link-item:hover .nav-link-underline,
        .nav-link-underline.is-active {
          width: 100%;
        }

        /* Actions */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .nav-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 13.5px;
          padding: 10px 22px;
          border-radius: 12px;
          background: linear-gradient(135deg, #DE510A 0%, #B9320D 100%);
          color: #ffffff;
          text-decoration: none;
          transition: transform 0.3s, box-shadow 0.3s;
          box-shadow: 0 8px 24px rgba(185,50,13,0.3);
        }

        .nav-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(185,50,13,0.42);
        }

        .cta-arrow {
          transition: transform 0.3s;
        }

        .nav-cta-btn:hover .cta-arrow {
          transform: translateX(4px);
        }

        .nav-mobile-toggle {
          display: none;
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        /* Mobile Drawer */
        .mobile-drawer {
          position: fixed;
          inset: 0;
          background: rgba(44, 71, 36, 0.98);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          z-index: 480;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
        }

        .mobile-nav-list {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 22px;
          width: 100%;
          max-width: 320px;
        }

        .mobile-link {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 20px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
          transition: color 0.3s;
        }

        .mobile-link:hover {
          color: #DE510A;
        }

        .mobile-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          font-weight: 700;
          padding: 14px 0;
          border-radius: 12px;
          background: linear-gradient(135deg, #DE510A 0%, #B9320D 100%);
          color: #ffffff;
          text-decoration: none;
          margin-top: 16px;
        }

        /* Responsive */
        @media (max-width: 960px) {
          .nav-links-desktop { display: none; }
          .nav-mobile-toggle { display: flex; }
          .nav-actions { gap: 10px; }
        }

        @media (max-width: 480px) {
          .nav-container { padding: 0 16px; }
          .nav-logo { height: 42px; }
          .nav-brand-name { font-size: 12px; }
          .nav-brand-sub { display: none; }
          .nav-cta-btn { padding: 8px 16px; font-size: 12px; }
        }
      `}</style>
    </>
  );
}
