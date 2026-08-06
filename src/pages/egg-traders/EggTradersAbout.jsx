import { useEffect, useRef } from 'react';
import { useCMSStore } from '../../store/useCMSStore';
import EggTradersPageBanner from '../../components/egg-traders/EggTradersPageBanner';

export default function EggTradersAbout() {
  const data = useCMSStore((s) => s.eggTraders.about);
  const banner = useCMSStore((s) => s.banners?.eggTraders?.about);
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
      <EggTradersPageBanner title={banner?.title || 'About Us'} subtitle={banner?.subtitle || ''} />
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
          .et-quote-block { background: linear-gradient(155deg, #0047BB, #003399); border: 1px solid rgba(0,71,187,0.3); border-radius: 32px; padding: 48px 44px; color: #ffffff; position: relative; overflow: hidden; }
          .et-quote-block::before { content: ''; position: absolute; inset: 0; background: radial-gradient(500px 300px at 80% 0%, rgba(247,107,13,0.14), transparent 60%), radial-gradient(400px 300px at 0% 100%, rgba(247,107,13,0.12), transparent 60%); pointer-events: none; }
          .et-quote-block::after { content: '"'; position: absolute; top: -30px; right: 18px; font-family: 'Space Grotesk',sans-serif; font-size: 180px; color: rgba(20,20,20,0.06); }
          .et-quote-text { font-family: 'Space Grotesk',sans-serif; font-size: 23px; font-weight: 500; line-height: 1.5; position: relative; z-index: 2; }
          .et-quote-foot { margin-top: 24px; font-size: 13px; color: #F76B0D; position: relative; z-index: 2; }
          .et-value-list { display: flex; flex-direction: column; gap: 0; margin-top: 30px; }
          .et-value-item { display: flex; gap: 18px; padding: 22px 0; border-bottom: 1px solid rgba(0,27,77,0.1); }
          .et-value-item:first-child { padding-top: 0; }
          .et-value-icon { width: 46px; height: 46px; border-radius: 12px; background: rgba(247,107,13,0.12); border: 1px solid rgba(247,107,13,0.25); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #F76B0D; }
          .et-value-title { font-weight: 700; font-size: 15px; color: #001B4D; margin-bottom: 5px; }
          .et-value-body { font-size: 13.5px; color: rgba(0,27,77,0.7); line-height: 1.65; }
          .et-about-text p { font-size: 15.5px; color: rgba(0,27,77,0.72); margin-bottom: 18px; }
          .et-team-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-top: 56px; }
          .et-team-card { background: #FFFFFF; border: 1px solid #001B4D; border-radius: 24px; padding: 32px 28px; backdrop-filter: blur(12px); transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s, border-color .35s; }
          .et-team-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,27,77,0.12); border-color: #F76B0D; background: #FFFFFF; }
          .et-team-avatar { width: 56px; height: 56px; border-radius: 14px; background: linear-gradient(145deg,#F76B0D,#E2580A); border: 1px solid rgba(247,107,13,0.35); display: flex; align-items: center; justify-content: center; color: #F76B0D; margin-bottom: 18px; }
          .et-team-name { font-weight: 700; font-size: 15px; color: #001B4D; }
          .et-team-role { font-size: 12px; color: #001B4D; font-weight: 600; margin: 4px 0 12px; text-transform: uppercase; letter-spacing: .04em; }
          .et-team-bio { font-size: 13px; color: rgba(0,27,77,0.6); line-height: 1.6; }
          @media (max-width: 1080px) { .et-team-grid { grid-template-columns: repeat(2,1fr); } }
          @media (max-width: 860px) { .et-about-grid { grid-template-columns: 1fr; gap: 40px; } .et-team-grid { grid-template-columns: repeat(2,1fr); } .et-quote-block { padding: 36px 28px; } .et-quote-text { font-size: 19px; } }
          @media (max-width: 640px) { .et-team-grid { grid-template-columns: 1fr; } }
          @media (max-width: 420px) { .et-quote-block { padding: 28px 20px; border-radius: 20px; } .et-quote-text { font-size: 17px; } .et-team-card { padding: 24px 20px; } .et-about-text p { font-size: 14px; } }
        `}</style>
      </div>
    </>
  );
}
