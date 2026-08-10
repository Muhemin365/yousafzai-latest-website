import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { useCMSStore } from '../../store/useCMSStore';

export default function EggTradersFooter() {
  const company = useCMSStore((s) => s.company) || {};
  const companyName = company.name || 'Yousafzai Eggs Traders';
  return (
    <footer style={{ background: 'linear-gradient(180deg, #001B4D 0%, #00285E 100%)', color: 'rgba(255,255,255,0.82)', padding: '60px 0 0', borderTop: '1px solid rgba(247,107,13,0.25)' }}>
      <div className="container">
        <div className="et-footer-grid">
          <div>
            <Link to="/egg-traders" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={logo} alt={companyName} style={{ height: 56, width: 'auto', flexShrink: 0, display: 'block' }} />
            </div>
            </Link>
            <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.62)', lineHeight: 1.7, maxWidth: 320 }}>
              A {companyName} company. Connecting verified poultry farms to commercial buyers with transparency and efficiency.
            </p>
          </div>
          <div>
            <div className="et-f-col-title">Company</div>
            <Link to="/egg-traders/about" style={{ display: 'block', fontSize: 13.5, color: 'rgba(255,255,255,0.72)', marginBottom: 12, textDecoration: 'none' }}>About Us</Link>
            <Link to="/egg-traders/products" style={{ display: 'block', fontSize: 13.5, color: 'rgba(255,255,255,0.72)', marginBottom: 12, textDecoration: 'none' }}>Products</Link>
            <Link to="/egg-traders/contact" style={{ display: 'block', fontSize: 13.5, color: 'rgba(255,255,255,0.72)', marginBottom: 12, textDecoration: 'none' }}>Contact Us</Link>
          </div>
          <div>
            <div className="et-f-col-title">Platform</div>
            <Link to="/egg-traders/solutions" style={{ display: 'block', fontSize: 13.5, color: 'rgba(255,255,255,0.72)', marginBottom: 12, textDecoration: 'none' }}>Plans</Link>
            <Link to="/egg-traders/process" style={{ display: 'block', fontSize: 13.5, color: 'rgba(255,255,255,0.72)', marginBottom: 12, textDecoration: 'none' }}>How It Works</Link>
            <Link to="/egg-traders/quality" style={{ display: 'block', fontSize: 13.5, color: 'rgba(255,255,255,0.72)', marginBottom: 12, textDecoration: 'none' }}>Quality</Link>
          </div>
          <div>
            <div className="et-f-col-title">Our Group</div>
            <Link to="/" style={{ display: 'block', fontSize: 13.5, color: 'rgba(255,255,255,0.72)', marginBottom: 12, textDecoration: 'none' }}>{companyName}</Link>
            <Link to="/egg-traders" style={{ display: 'block', fontSize: 13.5, color: 'rgba(255,255,255,0.72)', marginBottom: 12, textDecoration: 'none' }}>Egg Traders</Link>
          </div>
        </div>
        <div className="et-footer-bottom">
          <span>© 2026 Egg Traders — A {companyName} Company. All rights reserved.</span>
        </div>
      </div>

      <style>{`
        .et-footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 50px; padding-bottom: 40px; border-bottom: 1px solid rgba(247,107,13,0.25); }
        .et-f-col-title { font-size: 12.5px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: #FFFFFF; margin-bottom: 20px; }
        .et-footer-bottom { padding: 26px 0; display: flex; justify-content: space-between; font-size: 12.5px; color: rgba(255,255,255,0.55); }
        @media (max-width: 1080px) { .et-footer-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 640px) { .et-footer-grid { grid-template-columns: 1fr; } }
      `}</style>
    </footer>
  );
}
