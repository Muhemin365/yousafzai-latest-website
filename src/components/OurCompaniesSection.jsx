import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCMSStore } from '../store/useCMSStore';

export default function OurCompaniesSection() {
  const data = useCMSStore((s) => s.ourCompanies);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    el.querySelectorAll('.reveal, .reveal-stagger').forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef}>
      <section className="section-alt" id="our-companies">
        <div className="container">
          <div className="sec-head center reveal">
            <div className="tag-eyebrow" style={{ justifyContent: 'center' }}>
              {data.eyebrow}
            </div>
            <h2 className="sec-title">{data.title}</h2>
            <p className="sec-sub">{data.subtitle}</p>
          </div>
          <div className="companies-grid reveal-stagger">
            {data.companies.map((company) => (
              <Link key={company.id} to={company.url} className="company-card" style={{ '--company-color': company.color }}>
                <div className="company-card-bg" style={{ background: `linear-gradient(145deg,${company.color},${company.color}dd)` }} />
                <div className="company-logo">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="28" height="28">
                    <path d="M12 2C8 7 5 11.5 5 15a7 7 0 0014 0c0-3.5-3-8-7-13z" />
                  </svg>
                </div>
                <h3 className="company-name">{company.name}</h3>
                <p className="company-tagline">{company.tagline}</p>
                <p className="company-desc">{company.description}</p>
                <span className="company-cta">
                  Visit Website
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        #our-companies { padding: 120px 0; background: #FFFFFF; }
        .companies-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; max-width: 960px; margin: 0 auto; }
        .company-card {
          position: relative;
          border-radius: 32px;
          padding: 48px 40px;
          color: #FFFFFF;
          overflow: hidden;
          transition: transform .4s cubic-bezier(.22,1,.36,1), box-shadow .4s cubic-bezier(.22,1,.36,1);
          text-decoration: none;
          display: flex;
          flex-direction: column;
        }
        .company-card:hover { transform: translateY(-8px); box-shadow: 0 28px 60px rgba(0,0,0,0.18); }
        .company-card-bg { position: absolute; inset: 0; z-index: 0; }
        .company-card::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 1;
          background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0);
          background-size: 30px 30px;
        }
        .company-card > *:not(.company-card-bg) { position: relative; z-index: 2; }
        .company-logo {
          width: 56px; height: 56px; border-radius: 16px;
          background: rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 24px; backdrop-filter: blur(4px);
        }
        .company-name { font-family: 'Space Grotesk',sans-serif; font-weight: 700; font-size: 22px; margin-bottom: 6px; }
        .company-tagline { font-size: 13px; font-weight: 600; opacity: 0.8; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.06em; }
        .company-desc { font-size: 14.5px; line-height: 1.7; opacity: 0.85; margin-bottom: 28px; flex: 1; }
        .company-cta {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 13px; font-weight: 700; letter-spacing: 0.04em;
          text-transform: uppercase; padding: 12px 24px;
          border-radius: 10px; background: rgba(255,255,255,0.12);
          backdrop-filter: blur(4px); align-self: flex-start;
          transition: background .25s;
        }
        .company-card:hover .company-cta { background: rgba(255,255,255,0.22); }
        @media (max-width: 860px) {
          .companies-grid { grid-template-columns: 1fr; gap: 24px; }
          .company-card { padding: 36px 28px; }
          #our-companies { padding: 80px 0; }
        }
        @media (max-width: 420px) {
          .company-card { padding: 28px 20px; border-radius: 24px; }
          .company-name { font-size: 18px; }
          .company-desc { font-size: 13.5px; }
        }
      `}</style>
    </div>
  );
}
