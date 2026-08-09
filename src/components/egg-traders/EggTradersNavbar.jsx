import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ExternalLink } from 'lucide-react';
import logo from '../../assets/logo.svg';

const navLinks = [
  { path: '/egg-traders/about', label: 'About Us' },
  { path: '/egg-traders/products', label: 'Egg Products & Grades' },
  { path: '/egg-traders/process', label: 'Quality & Process' },
  { path: '/egg-traders/contact', label: 'Order Bulk Eggs' },
];

export default function EggTradersNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path) => pathname === path;

  return (
    <>
      <nav className={`et-nav-glass ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="et-nav-container">
          {/* Logo */}
          <Link to="/egg-traders" className="et-nav-brand" onClick={() => setMobileOpen(false)}>
            <img src={logo} alt="Egg Traders" className="et-nav-logo" />
          </Link>

          {/* Nav Links */}
          <div className="et-nav-links-desktop">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`et-nav-link-item ${isActive(link.path) ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                <span>{link.label}</span>
                <span className={`et-nav-underline ${isActive(link.path) ? 'is-active' : ''}`} />
              </Link>
            ))}
          </div>

          {/* Right Action */}
          <div className="et-nav-actions">
            <Link to="/egg-traders/contact" className="et-cta-gold">
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                <path d="M12 2C8 7 5 11.5 5 15a7 7 0 0014 0c0-3.5-3-8-7-13z" />
              </svg>
              <span>Order Bulk Eggs</span>
              <ArrowRight size={14} className="cta-arrow" />
            </Link>

            <Link to="/" className="et-main-site-btn">
              <ExternalLink size={13} />
              <span>Main Site</span>
            </Link>

            <button
              className="et-mobile-toggle"
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
        <div className="et-mobile-drawer">
          <div className="et-mobile-nav-list">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="et-mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/egg-traders/contact"
              className="et-mobile-cta"
              onClick={() => setMobileOpen(false)}
            >
              <span>Order Bulk Eggs</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}

      <style>{`
        .et-nav-glass {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 500;
          padding: 20px 0;
          background: rgba(0, 27, 77, 0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(247, 107, 13, 0.3);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .et-nav-glass.is-scrolled {
          padding: 12px 0;
          background: rgba(0, 27, 77, 0.96);
          border-bottom-color: rgba(247, 107, 13, 0.5);
          box-shadow: 0 10px 30px rgba(0, 27, 77, 0.35);
        }

        .et-nav-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .et-nav-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .et-nav-logo {
          height: 48px;
          width: auto;
          display: block;
        }

        .et-brand-tag {
          display: flex;
          flex-direction: column;
        }

        .et-tag-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 15px;
          color: #FFFFFF;
        }

        .et-tag-sub {
          font-family: monospace;
          font-size: 9px;
          color: #F76B0D;
          letter-spacing: 0.12em;
        }

        .et-nav-links-desktop {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .et-nav-link-item {
          position: relative;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.78);
          padding: 6px 0;
          text-decoration: none;
          transition: color 0.3s;
        }

        .et-nav-link-item:hover, .et-nav-link-item.active {
          color: #F76B0D;
        }

        .et-nav-underline {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #F76B0D, #F76B0D);
          border-radius: 2px;
          transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .et-nav-link-item:hover .et-nav-underline,
        .et-nav-underline.is-active {
          width: 100%;
        }

        .et-nav-actions {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .et-cta-gold {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 13.5px;
          padding: 10px 22px;
          border-radius: 10px;
          background: linear-gradient(135deg, #F76B0D 0%, #E2580A 100%);
          color: #ffffff;
          text-decoration: none;
          transition: transform 0.3s, box-shadow 0.3s;
          box-shadow: 0 8px 24px rgba(247, 107, 13, 0.35);
        }

        .et-cta-gold:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(247, 107, 13, 0.45);
        }

        .et-main-site-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: monospace;
          font-size: 12px;
          color: rgba(255,255,255,0.75);
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 9px 16px;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.3s;
        }

        .et-main-site-btn:hover {
          color: #F76B0D;
          border-color: #F76B0D;
        }

        .et-mobile-toggle {
          display: none;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.2);
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .et-mobile-drawer {
          position: fixed;
          inset: 0;
          background: rgba(0, 27, 77, 0.98);
          backdrop-filter: blur(24px);
          z-index: 480;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }

        .et-mobile-nav-list {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          width: 100%;
          max-width: 320px;
        }

        .et-mobile-link {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 20px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
        }

        .et-mobile-cta {
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
          background: linear-gradient(135deg, #F76B0D 0%, #E2580A 100%);
          color: #ffffff;
          text-decoration: none;
          margin-top: 16px;
        }

        @media (max-width: 860px) {
          .et-nav-links-desktop { display: none; }
          .et-mobile-toggle { display: flex; }
          .et-cta-gold { padding: 10px; width: 40px; height: 40px; justify-content: center; flex-shrink: 0; }
          .et-cta-gold span, .et-cta-gold .cta-arrow { display: none; }
        }

        @media (max-width: 480px) {
          .et-nav-container { padding: 0 16px; }
          .et-nav-logo { height: 38px; }
          .et-main-site-btn { display: none; }
        }
      `}</style>
    </>
  );
}
