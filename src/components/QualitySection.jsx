import { useEffect, useRef } from 'react';
import { useCMSStore } from '../store/useCMSStore';

export default function QualitySection() {
  const quality = useCMSStore((s) => s.quality);
  const testimonials = useCMSStore((s) => s.testimonials);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const wrap = el.querySelector('#traceWrap');
    const fill = el.querySelector('#traceFill');
    if (!wrap || !fill) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fill.style.width = '100%';
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(wrap);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <section className="section-alt" id="quality">
        <div className="container">
          <div className="sec-head reveal">
            <div className="tag-eyebrow">{quality.eyebrow}</div>
            <h2 className="sec-title">{quality.title}</h2>
            <p className="sec-sub">{quality.subtitle}</p>
          </div>

          <div className="trace-panel reveal">
            <div className="trace-top">
              <div>
                <div className="trace-top-title">{quality.batch.title}</div>
                <div className="trace-top-sub">{quality.batch.subtitle}</div>
              </div>
              <div className="trace-id">{quality.batch.id}</div>
            </div>
            <div className="trace-steps" id="traceWrap">
              <div className="flow-line"><div className="flow-fill" id="traceFill"></div></div>
              {quality.batch.steps.map((step, i) => (
                <div key={i} className="flow-step">
                  <div className="flow-dot">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="26" height="26">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flow-title">{step.title}</div>
                  <div className="flow-desc">{step.time}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="sec-head reveal" style={{ marginBottom: 30 }}>
            <div className="tag-eyebrow">Active Certifications</div>
          </div>
          <div className="cert-grid reveal-stagger">
            {quality.certs.map((cert, i) => (
              <div key={i} className="cert-card">
                <div className="cert-ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="19" height="19">
                    {cert.icon === 'ClipboardList' ? <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></> :
                     cert.icon === 'ShieldCheck' ? <><path d="M12 2l8 4v6c0 5-3.6 8-8 10-4.4-2-8-5-8-10V6l8-4z" /></> :
                     cert.icon === 'CheckCircle2' ? <><circle cx="12" cy="12" r="9" /><path d="M9 12l2 2 4-4" /></> :
                     cert.icon === 'Users' ? <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" /></> :
                     cert.icon === 'Leaf' ? <><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" /></> :
                     <path d="M9 3h6M10 3v5l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3" />}
                  </svg>
                </div>
                <div>
                  <div className="cert-name">{cert.name}</div>
                  <div className="cert-body">{cert.body}</div>
                  <span className="cert-status">{cert.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials">
        <div className="container">
          <div className="sec-head center reveal" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <div className="tag-eyebrow" style={{ justifyContent: 'center' }}>Client Testimonials</div>
            <h2 className="sec-title">Trusted by Commercial Buyers Across the Region</h2>
          </div>
          <div className="test-grid reveal-stagger">
            {testimonials.map((t, i) => (
              <div key={i} className="test-card">
                <div className="test-quote-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30">
                    <path d="M7 7h4v4l-3 6H5l2-6H4V7zm9 0h4v4l-3 6h-3l2-6h-3V7z" />
                  </svg>
                </div>
                <div className="test-text">{t.text}</div>
                <div className="test-person">
                  <div className="test-avatar">{t.initials}</div>
                  <div>
                    <div className="test-name">{t.name}</div>
                    <div className="test-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .trace-panel { background: #FFFFFF; border: 1px solid #EEF1F5; border-radius: 32px; overflow: hidden; box-shadow: 0 14px 36px rgba(11,37,69,0.10); margin-bottom: 60px; }
        .trace-top { padding: 24px 34px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #EEF1F5; }
        .trace-top-title { font-weight: 700; font-size: 15px; color: #0B2545; }
        .trace-top-sub { font-size: 12px; color: #707888; margin-top: 3px; }
        .trace-id { font-family: monospace; font-size: 12.5px; background: #F5F7FA; padding: 6px 14px; border-radius: 6px; color: #444C5C; }
        .trace-steps { display: flex; padding: 40px 34px 34px; position: relative; }
        .trace-steps .flow-line { top: 20px; }
        .cert-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 18px; }
        .cert-card { background: #FFFFFF; border: 1px solid #EEF1F5; border-radius: 16px; padding: 24px; display: flex; align-items: center; gap: 16px; transition: box-shadow .3s, transform .3s; }
        .cert-card:hover { box-shadow: 0 2px 10px rgba(11,37,69,0.06); transform: translateY(-3px); }
        .cert-ic { width: 44px; height: 44px; border-radius: 11px; background: #F5F7FA; display: flex; align-items: center; justify-content: center; color: #0B2545; flex-shrink: 0; }
        .cert-name { font-weight: 700; font-size: 13.5px; color: #0B2545; }
        .cert-body { font-size: 11.5px; color: #707888; margin-top: 3px; }
        .cert-status { font-size: 9.5px; font-weight: 700; color: #1F7A3D; background: #E6F4EA; padding: 2px 8px; border-radius: 20px; margin-top: 6px; display: inline-block; }
        .test-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        .test-card { background: #FFFFFF; border: 1px solid #EEF1F5; border-radius: 24px; padding: 32px; position: relative; }
        .test-quote-icon { color: #F1E4C3; margin-bottom: 18px; }
        .test-text { font-size: 14.5px; color: #444C5C; line-height: 1.75; margin-bottom: 24px; min-height: 120px; }
        .test-person { display: flex; align-items: center; gap: 14px; border-top: 1px solid #EEF1F5; padding-top: 18px; }
        .test-avatar { width: 42px; height: 42px; border-radius: 50%; background: linear-gradient(145deg,#0B2545,#123A6B); color: #F1E4C3; display: flex; align-items: center; justify-content: center; font-family: 'Space Grotesk',sans-serif; font-weight: 700; font-size: 14px; }
        .test-name { font-weight: 700; font-size: 13.5px; color: #0B2545; }
        .test-role { font-size: 11.5px; color: #707888; }
        @media (max-width: 1080px) { .cert-grid { grid-template-columns: repeat(2,1fr); } .test-grid { grid-template-columns: repeat(2,1fr); } .test-card:nth-child(3) { grid-column: 1 / -1; justify-self: center; width: 50%; } }
        @media (max-width: 860px) { .test-card:nth-child(3) { width: 100%; } }
      `}</style>
    </div>
  );
}
