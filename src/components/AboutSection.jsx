import { useEffect, useRef } from 'react';
import { useCMSStore } from '../store/useCMSStore';

export default function AboutSection() {
  const about = useCMSStore((s) => s.about);
  const overview = useCMSStore((s) => s.overview);
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
      <section id="about">
        <div className="container">
          <div className="sec-head reveal">
            <div className="tag-eyebrow">{about.eyebrow}</div>
            <h2 className="sec-title">{about.title}</h2>
            <p className="sec-sub">{about.subtitle}</p>
          </div>
          <div className="about-grid">
            <div className="reveal">
              <div className="quote-block">
                <p className="q">{about.quote}</p>
                <div className="q-foot">{about.quoteFooter}</div>
              </div>
              <div className="value-list">
                {about.values.map((v, i) => (
                  <div key={i} className="value-item">
                    <div className="v-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="21" height="21">
                        {v.icon === 'Box' ? <path d="M12 3v18M5 8l7-5 7 5M5 8v8l7 5 7-5V8" /> :
                         v.icon === 'ShieldCheck' ? <><path d="M12 2l8 4v6c0 5-3.6 8-8 10-4.4-2-8-5-8-10V6l8-4z" /></> :
                          <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></>}
                      </svg>
                    </div>
                    <div>
                      <div className="v-title">{v.title}</div>
                      <div className="v-body">{v.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="about-text reveal">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <div className="team-grid">
                {about.team.map((member, i) => (
                  <div key={i} className="team-card">
                    <div className="team-avatar">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="24" height="24">
                        <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
                      </svg>
                    </div>
                    <div className="team-name">{member.name}</div>
                    <div className="team-role">{member.role}</div>
                    <div className="team-bio">{member.bio}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-alt" id="overview">
        <div className="container">
          <div className="sec-head center reveal">
            <div className="tag-eyebrow" style={{ justifyContent: 'center' }}>Company Overview</div>
            <h2 className="sec-title">The Numbers Behind Our Business</h2>
            <p className="sec-sub">A consolidated profile of Yousafzai EGRO's trading and B2B supply operation.</p>
          </div>
          <div className="overview-wrap reveal">
            {overview.rows.map((row, i) => (
              <div key={i} className="overview-row">
                <span className="ov-label">{row.label}</span>
                <span className="ov-val">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        section { padding: 120px 0; position: relative; }
        .section-alt { background: #FFFFFF; }
        .sec-head { max-width: 680px; }
        .sec-head.center { margin-left: auto; margin-right: auto; text-align: center; }
        .about-grid { display: grid; grid-template-columns: .95fr 1.05fr; gap: 72px; align-items: start; }
        .quote-block { background: linear-gradient(155deg,#0B2545,#123A6B); border-radius: 32px; padding: 48px 44px; color: #FFFFFF; position: relative; overflow: hidden; text-align: center; }
        .quote-block::after { content: '"'; position: absolute; top: -30px; left: 50%; transform: translateX(-50%); font-family: 'Space Grotesk',sans-serif; font-size: 180px; color: rgba(255,255,255,0.06); }
        .quote-block p.q { font-family: 'Space Grotesk',sans-serif; font-size: 23px; font-weight: 500; line-height: 1.5; position: relative; z-index: 2; }
        .quote-block .q-foot { margin-top: 24px; font-size: 13px; color: rgba(255,255,255,0.6); position: relative; z-index: 2; }
        .value-list { display: flex; flex-direction: column; gap: 0; margin-top: 30px; }
        .value-item { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 14px; padding: 22px 0; border-bottom: 1px solid #EEF1F5; }
        .value-item:first-child { padding-top: 0; }
        .v-icon { width: 46px; height: 46px; border-radius: 12px; background: #F1E4C3; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #0B2545; }
        .v-title { font-weight: 700; font-size: 15px; color: #0B2545; margin-bottom: 5px; }
        .v-body { font-size: 13.5px; color: #707888; line-height: 1.65; }
        .about-text p { font-size: 15.5px; color: #444C5C; margin-bottom: 18px; text-align: center; }
        .team-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-top: 56px; }
        .team-card { background: #F5F7FA; border-radius: 24px; padding: 32px 28px; transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s cubic-bezier(.22,1,.36,1); }
        .team-card:hover { transform: translateY(-6px); box-shadow: 0 14px 36px rgba(11,37,69,0.10); background: #FFFFFF; }
        .team-avatar { width: 56px; height: 56px; border-radius: 14px; background: linear-gradient(145deg,#0B2545,#123A6B); display: flex; align-items: center; justify-content: center; color: #F1E4C3; margin-bottom: 18px; }
        .team-name { font-weight: 700; font-size: 15px; color: #0B2545; }
        .team-role { font-size: 12px; color: #9C7B2E; font-weight: 600; margin: 4px 0 12px; text-transform: uppercase; letter-spacing: .04em; }
        .team-bio { font-size: 13px; color: #707888; line-height: 1.6; }
        .overview-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-radius: 24px; overflow: hidden; box-shadow: 0 14px 36px rgba(11,37,69,0.10); }
        .overview-row { display: flex; justify-content: space-between; align-items: center; padding: 20px 30px; background: #FFFFFF; border-bottom: 1px solid #EEF1F5; }
        .overview-row:nth-child(odd) { background: #F5F7FA; }
        .ov-label { font-size: 13px; color: #707888; font-weight: 600; text-transform: uppercase; letter-spacing: .03em; }
        .ov-val { font-size: 14.5px; color: #0B2545; font-weight: 700; text-align: right; }
        .reveal { opacity: 0; transform: translateY(28px); transition: opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1); }
        .reveal.in { opacity: 1; transform: translateY(0); }
        .reveal-stagger > * { opacity: 0; transform: translateY(24px); transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1); }
        .reveal-stagger.in > * { opacity: 1; transform: translateY(0); }
        .reveal-stagger.in > *:nth-child(1) { transition-delay: .05s; }
        .reveal-stagger.in > *:nth-child(2) { transition-delay: .12s; }
        .reveal-stagger.in > *:nth-child(3) { transition-delay: .19s; }
        .reveal-stagger.in > *:nth-child(4) { transition-delay: .26s; }
        .reveal-stagger.in > *:nth-child(5) { transition-delay: .33s; }
        .reveal-stagger.in > *:nth-child(6) { transition-delay: .40s; }
        @media (max-width: 1080px) {
          .team-grid { grid-template-columns: repeat(2,1fr); }
          .team-card:nth-child(3) { grid-column: 1 / -1; justify-self: center; width: 50%; text-align: center; }
          .team-card:nth-child(3) .team-avatar { margin: 0 auto 18px; }
        }
        @media (max-width: 860px) {
          .about-grid { grid-template-columns: 1fr; }
          .overview-wrap { grid-template-columns: 1fr; }
          section { padding: 80px 0; }
          .team-card:nth-child(3) { width: 100%; }
        }
      `}</style>
    </div>
  );
}
