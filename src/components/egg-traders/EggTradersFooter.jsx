import { Link } from 'react-router-dom';
import logo from '../../assets/logo.jpg';

const etTheme = {
  navy: '#0D6B3D',
  'navy-2': '#059669',
  'navy-deep': '#064E3B',
  gold: '#F59E0B',
  'gold-lt': '#FDE68A',
};

export default function EggTradersFooter() {
  return (
    <footer style={{ background: etTheme['navy-deep'], color: 'rgba(255,255,255,0.7)', padding: '60px 0 0' }}>
      <div className="container">
        <div className="et-footer-grid">
          <div>
            <Link to="/egg-traders" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, textDecoration: 'none' }}>
            <div style={{ borderRadius: 10, padding: '4px 6px', display: 'flex', alignItems: 'center' }}>
              <img src={logo} alt="Yousafzai EGRO" style={{ height: 42, width: 'auto', flexShrink: 0, display: 'block' }} />
            </div>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
                <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 16, color: '#FFFFFF' }}>Egg Traders</span>
                <span style={{ fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: etTheme['gold-lt'], fontWeight: 600 }}>Poultry Marketplace</span>
              </div>
            </Link>
            <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: 320 }}>
              A Yousafzai EGRO company. Connecting verified poultry farms to commercial buyers with transparency and efficiency.
            </p>
          </div>
          <div>
            <div className="et-f-col-title">Company</div>
            <Link to="/egg-traders/about" style={{ display: 'block', fontSize: 13.5, color: 'rgba(255,255,255,0.55)', marginBottom: 12, textDecoration: 'none' }}>About Us</Link>
            <Link to="/egg-traders/products" style={{ display: 'block', fontSize: 13.5, color: 'rgba(255,255,255,0.55)', marginBottom: 12, textDecoration: 'none' }}>Products</Link>
            <Link to="/egg-traders/contact" style={{ display: 'block', fontSize: 13.5, color: 'rgba(255,255,255,0.55)', marginBottom: 12, textDecoration: 'none' }}>Contact Us</Link>
          </div>
          <div>
            <div className="et-f-col-title">Platform</div>
            <Link to="/egg-traders/solutions" style={{ display: 'block', fontSize: 13.5, color: 'rgba(255,255,255,0.55)', marginBottom: 12, textDecoration: 'none' }}>Plans</Link>
            <Link to="/egg-traders/process" style={{ display: 'block', fontSize: 13.5, color: 'rgba(255,255,255,0.55)', marginBottom: 12, textDecoration: 'none' }}>How It Works</Link>
            <Link to="/egg-traders/quality" style={{ display: 'block', fontSize: 13.5, color: 'rgba(255,255,255,0.55)', marginBottom: 12, textDecoration: 'none' }}>Quality</Link>
          </div>
          <div>
            <div className="et-f-col-title">Our Group</div>
            <Link to="/" style={{ display: 'block', fontSize: 13.5, color: 'rgba(255,255,255,0.55)', marginBottom: 12, textDecoration: 'none' }}>Yousafzai EGRO</Link>
            <Link to="/egg-traders" style={{ display: 'block', fontSize: 13.5, color: 'rgba(255,255,255,0.55)', marginBottom: 12, textDecoration: 'none' }}>Egg Traders</Link>
          </div>
        </div>
        <div className="et-footer-bottom">
          <span>© 2026 Egg Traders — A Yousafzai EGRO Company. All rights reserved.</span>
        </div>
      </div>

      <style>{`
        .et-footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 50px; padding-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .et-f-col-title { font-size: 12.5px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: #FFFFFF; margin-bottom: 20px; }
        .et-footer-bottom { padding: 26px 0; display: flex; justify-content: space-between; font-size: 12.5px; color: rgba(255,255,255,0.45); }
        @media (max-width: 1080px) { .et-footer-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 640px) { .et-footer-grid { grid-template-columns: 1fr; } }
      `}</style>
    </footer>
  );
}
