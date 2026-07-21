import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCMSStore } from '../../store/useCMSStore';
import EggTradersPageBanner from '../../components/egg-traders/EggTradersPageBanner';

export default function EggTradersSolutions() {
  const data = useCMSStore((s) => s.eggTraders.solutions);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); }
        });
      },
      { threshold: 0.15 }
    );
    el.querySelectorAll('.reveal, .reveal-stagger').forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <EggTradersPageBanner title="Solutions" subtitle="Choose the right marketplace plan for your business — from basic access to enterprise-grade trading with API integration and custom contracts." />
      <div ref={ref}>
        <section className="section-alt">
          <div className="container">
            <div className="sec-head reveal">
              <div className="tag-eyebrow">{data.eyebrow}</div>
              <h2 className="sec-title">{data.title}</h2>
              <p className="sec-sub">{data.subtitle}</p>
            </div>
            <div className="et-tier-grid reveal-stagger">
              {data.tiers.map((tier, i) => (
                <div key={i} className={`et-tier-card ${tier.featured ? 'featured' : ''}`}>
                  <div className="et-tier-head">
                    <span className="et-tier-badge">{tier.badge}</span>
                    <div className="et-tier-name">{tier.name}</div>
                    <div className="et-tier-desc">{tier.desc}</div>
                  </div>
                  <div className="et-tier-feats">
                    {tier.features.map((feat, j) => (
                      <div key={j} className="et-tf-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                        {feat}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 44 }} className="reveal">
              <Link to="/egg-traders/contact" className="btn-navy">
                <span>Get Started →</span>
              </Link>
            </div>
          </div>
        </section>

        <style>{`
          .et-tier-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
          .et-tier-card { background: #FFFFFF; border: 1px solid #EEF1F5; border-radius: 24px; overflow: hidden; transition: transform .4s, box-shadow .4s; display: flex; flex-direction: column; }
          .et-tier-card:hover { transform: translateY(-8px); box-shadow: 0 28px 70px rgba(13,107,61,0.16); }
          .et-tier-card.featured { border: 2px solid #F59E0B; position: relative; }
          .et-tier-card.featured::before { content: 'Most Popular'; position: absolute; top: 18px; right: -34px; background: #F59E0B; color: #064E3B; font-size: 10.5px; font-weight: 700; padding: 5px 38px; transform: rotate(40deg); letter-spacing: .04em; z-index: 2; }
          .et-tier-head { padding: 30px 28px; background: #F5F7FA; }
          .et-tier-card.featured .et-tier-head { background: linear-gradient(155deg,#0D6B3D,#059669); color: #FFFFFF; }
          .et-tier-badge { font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #D97706; margin-bottom: 10px; display: block; }
          .et-tier-card.featured .et-tier-badge { color: #FDE68A; }
          .et-tier-name { font-family: 'Space Grotesk',sans-serif; font-size: 22px; font-weight: 600; color: #0D6B3D; }
          .et-tier-card.featured .et-tier-name { color: #FFFFFF; }
          .et-tier-desc { font-size: 13px; color: #707888; margin-top: 6px; }
          .et-tier-card.featured .et-tier-desc { color: rgba(255,255,255,0.65); }
          .et-tier-feats { padding: 26px 28px 30px; flex: 1; display: flex; flex-direction: column; gap: 14px; }
          .et-tf-item { display: flex; align-items: flex-start; gap: 10px; font-size: 13.5px; color: #444C5C; }
          .et-tf-item svg { color: #0D6B3D; flex-shrink: 0; margin-top: 2px; }
          @media (max-width: 1080px) { .et-tier-grid { grid-template-columns: repeat(2,1fr); } .et-tier-card:nth-child(3) { grid-column: 1 / -1; justify-self: center; width: 50%; } }
          @media (max-width: 640px) { .et-tier-card:nth-child(3) { width: 100%; } .et-tier-grid { grid-template-columns: 1fr; } .et-tier-head { padding: 24px 22px; } .et-tier-feats { padding: 22px 22px 26px; } }
          @media (max-width: 420px) { .et-tier-head { padding: 20px 18px; } .et-tier-feats { padding: 18px 18px 22px; } .et-tier-name { font-size: 18px; } }
        `}</style>
      </div>
    </>
  );
}
