import { useEffect, useRef } from 'react';
import { useCMSStore } from '../../store/useCMSStore';
import EggTradersPageBanner from '../../components/egg-traders/EggTradersPageBanner';

export default function EggTradersAbout() {
  const data = useCMSStore((s) => s.eggTraders.about);
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
      <EggTradersPageBanner title="About Us" subtitle="Learn about the Egg Traders platform — our mission, values, and the team behind Pakistan's fastest-growing poultry marketplace." />
      <div ref={ref}>
        <section className="section-alt" id="et-about">
          <div className="container">
            <div className="sec-head reveal">
              <div className="tag-eyebrow">{data.eyebrow}</div>
              <h2 className="sec-title">{data.title}</h2>
              <p className="sec-sub">{data.subtitle}</p>
            </div>
            <div className="et-about-grid">
              <div className="reveal">
                <div className="et-quote-block">
                  <p className="et-quote-text">{data.quote}</p>
                  <div className="et-quote-foot">{data.quoteFooter}</div>
                </div>
                <div className="et-value-list">
                  {data.features.map((f, i) => (
                    <div key={i} className="et-value-item">
                      <div className="et-value-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
                          {f.icon === 'Feather' ? <path d="M12 2C8 7 5 11.5 5 15a7 7 0 0014 0c0-3.5-3-8-7-13z" /> :
                           f.icon === 'TrendingUp' ? <><path d="M22 7l-7 7-4-4-4 4" /><path d="M22 2h-6v6" /></> :
                           <><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" /></>}
                        </svg>
                      </div>
                      <div>
                        <div className="et-value-title">{f.title}</div>
                        <div className="et-value-body">{f.body}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="et-about-text reveal">
                {data.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                <div className="et-team-grid reveal-stagger">
                  {data.team.map((m, i) => (
                    <div key={i} className="et-team-card">
                      <div className="et-team-avatar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="24" height="24">
                          <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
                        </svg>
                      </div>
                      <div className="et-team-name">{m.name}</div>
                      <div className="et-team-role">{m.role}</div>
                      <div className="et-team-bio">{m.bio}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <style>{`
          .et-about-grid { display: grid; grid-template-columns: .95fr 1.05fr; gap: 72px; align-items: start; }
          .et-quote-block { background: linear-gradient(155deg, rgba(23,62,114,0.9), rgba(11,37,69,0.95)); border: 1px solid rgba(200,162,74,0.3); border-radius: 32px; padding: 48px 44px; color: #FFFFFF; position: relative; overflow: hidden; }
          .et-quote-block::before { content: ''; position: absolute; inset: 0; background: radial-gradient(500px 300px at 80% 0%, rgba(200,162,74,0.14), transparent 60%), radial-gradient(400px 300px at 0% 100%, rgba(59,130,246,0.12), transparent 60%); pointer-events: none; }
          .et-quote-block::after { content: '"'; position: absolute; top: -30px; right: 18px; font-family: 'Space Grotesk',sans-serif; font-size: 180px; color: rgba(255,255,255,0.06); }
          .et-quote-text { font-family: 'Space Grotesk',sans-serif; font-size: 23px; font-weight: 500; line-height: 1.5; position: relative; z-index: 2; }
          .et-quote-foot { margin-top: 24px; font-size: 13px; color: #7FB6F2; position: relative; z-index: 2; }
          .et-value-list { display: flex; flex-direction: column; gap: 0; margin-top: 30px; }
          .et-value-item { display: flex; gap: 18px; padding: 22px 0; border-bottom: 1px solid rgba(255,255,255,0.08); }
          .et-value-item:first-child { padding-top: 0; }
          .et-value-icon { width: 46px; height: 46px; border-radius: 12px; background: rgba(200,162,74,0.12); border: 1px solid rgba(200,162,74,0.25); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #C8A24A; }
          .et-value-title { font-weight: 700; font-size: 15px; color: #FFFFFF; margin-bottom: 5px; }
          .et-value-body { font-size: 13.5px; color: rgba(255,255,255,0.6); line-height: 1.65; }
          .et-about-text p { font-size: 15.5px; color: rgba(255,255,255,0.7); margin-bottom: 18px; }
          .et-team-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-top: 56px; }
          .et-team-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; padding: 32px 28px; backdrop-filter: blur(12px); transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s, border-color .35s; }
          .et-team-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,0.4); border-color: rgba(200,162,74,0.35); background: rgba(255,255,255,0.05); }
          .et-team-avatar { width: 56px; height: 56px; border-radius: 14px; background: linear-gradient(145deg,#0B2545,#173E72); border: 1px solid rgba(127,182,242,0.3); display: flex; align-items: center; justify-content: center; color: #E5C87A; margin-bottom: 18px; }
          .et-team-name { font-weight: 700; font-size: 15px; color: #FFFFFF; }
          .et-team-role { font-size: 12px; color: #C8A24A; font-weight: 600; margin: 4px 0 12px; text-transform: uppercase; letter-spacing: .04em; }
          .et-team-bio { font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.6; }
          @media (max-width: 1080px) { .et-team-grid { grid-template-columns: repeat(2,1fr); } }
          @media (max-width: 860px) { .et-about-grid { grid-template-columns: 1fr; gap: 40px; } .et-team-grid { grid-template-columns: repeat(2,1fr); } .et-quote-block { padding: 36px 28px; } .et-quote-text { font-size: 19px; } }
          @media (max-width: 640px) { .et-team-grid { grid-template-columns: 1fr; } }
          @media (max-width: 420px) { .et-quote-block { padding: 28px 20px; border-radius: 20px; } .et-quote-text { font-size: 17px; } .et-team-card { padding: 24px 20px; } .et-about-text p { font-size: 14px; } }
        `}</style>
      </div>
    </>
  );
}
