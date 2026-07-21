import { Link } from 'react-router-dom';
import { useCMSStore } from '../store/useCMSStore';

export default function FooterSection() {
  const company = useCMSStore((s) => s.company);
  const footer = useCMSStore((s) => s.footer);

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="brand" style={{ textDecoration: 'none' }}>
              <div className="brand-mark">
                <svg viewBox="0 0 24 24" fill="none" stroke="#F1E4C3" strokeWidth="1.6" width="22" height="22">
                  <path d="M12 2C8 7 5 11.5 5 15a7 7 0 0014 0c0-3.5-3-8-7-13z" />
                </svg>
              </div>
              <div className="brand-text">
                <span className="brand-name">{company.name}</span>
                <span className="brand-sub">{company.sub}</span>
              </div>
            </Link>
            <p className="footer-desc">{company.tagline}</p>
            <div className="social-row">
              <a href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                  <path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.5.3v2.7h-1.7c-1.3 0-1.6.6-1.6 1.5V12h2.9l-.5 2.9h-2.4v7A10 10 0 0022 12z" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                  <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.3 18V9.7H5.7V18h2.6zM7 8.6a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.3 18v-4.6c0-2.5-1.3-3.6-3-3.6-1.4 0-2 .8-2.4 1.3V9.7H10.3c0 .3 0 8.3 0 8.3h2.6v-4.6c0-.3 0-.5.1-.7.2-.6.8-1.2 1.7-1.2 1.2 0 1.7.9 1.7 2.2V18h2.6z" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm5.7 6.4l-1.6 7.5c-.1.6-.4.7-.9.5l-2.5-1.8-1.2 1.2c-.1.1-.3.2-.4.2l.2-2.5 4.6-4.1c.2-.2 0-.3-.2-.1l-5.6 3.6-2.4-.8c-.5-.2-.5-.5.1-.7l9.4-3.6c.4-.2.8.1.5.6z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Company</div>
            {footer.quickLinks.map((link, i) => (
              <Link key={i} to={link.href}>{link.label}</Link>
            ))}
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Solutions</div>
            {footer.solutionsLinks.map((link, i) => (
              <Link key={i} to={link.href}>{link.label}</Link>
            ))}
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Resources</div>
            {footer.resourcesLinks.map((link, i) => (
              <Link key={i} to={link.href}>{link.label}</Link>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span>{footer.copyright}</span>
          <span>{footer.locations}</span>
        </div>
      </div>

      <style>{`
        footer { background: #071A30; color: rgba(255,255,255,0.7); padding: 80px 0 0; }
        .footer-grid { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 50px; padding-bottom: 60px; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .footer-brand { display: flex; flex-direction: column; align-items: center; text-align: center; }
        .footer-brand .brand-name { color: #FFFFFF; }
        .brand { display: flex; align-items: center; justify-content: center; gap: 12px; }
        .brand-mark { width: 42px; height: 42px; border-radius: 11px; background: linear-gradient(145deg,#0B2545,#123A6B); display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 6px 16px rgba(11,37,69,0.28); }
        .brand-text { display: flex; flex-direction: column; line-height: 1.1; text-align: left; }
        .brand-name { font-family: 'Space Grotesk',sans-serif; font-weight: 700; font-size: 16px; letter-spacing: .02em; color: #FFFFFF; }
        .brand-sub { font-size: 10px; letter-spacing: .18em; text-transform: uppercase; color: #9C7B2E; font-weight: 600; }
        .footer-desc { font-size: 13.5px; color: rgba(255,255,255,0.5); margin-top: 18px; line-height: 1.7; max-width: 300px; text-align: center; }
        .footer-col { display: flex; flex-direction: column; align-items: center; }
        .footer-col-title { font-size: 12.5px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: #FFFFFF; margin-bottom: 20px; text-align: center; }
        .footer-col a { display: block; font-size: 13.5px; color: rgba(255,255,255,0.55); margin-bottom: 12px; transition: color .25s; text-align: center; }
        .footer-col a:hover { color: #C8A24A; }
        .social-row { display: flex; justify-content: center; gap: 10px; margin-top: 22px; }
        .social-row a { width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: center; }
        .social-row a:hover { background: #C8A24A; color: #071A30; }
        .footer-bottom { padding: 26px 0; display: flex; justify-content: space-between; font-size: 12.5px; color: rgba(255,255,255,0.45); }
        @media (min-width: 860px) {
          .footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; align-items: start; text-align: left; }
          .footer-brand { align-items: flex-start; text-align: left; }
          .brand { justify-content: flex-start; }
          .footer-desc { text-align: left; }
          .footer-col { align-items: flex-start; }
          .footer-col-title { text-align: left; }
          .footer-col a { text-align: left; }
          .social-row { justify-content: flex-start; }
        }
        @media (max-width: 1080px) and (min-width: 860px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
      `}</style>
    </footer>
  );
}
