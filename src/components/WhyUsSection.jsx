import { useEffect, useRef, useState } from 'react';
import { useCMSStore } from '../store/useCMSStore';

function StatCounter({ end, suffix }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = parseInt(end, 10);
            let start = 0;
            const dur = 1600;
            const startTime = performance.now();
            function step(now) {
              const progress = Math.min((now - startTime) / dur, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setCount(Math.floor(eased * target));
              if (progress < 1) requestAnimationFrame(step);
              else setCount(target);
            }
            requestAnimationFrame(step);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function WhyUsSection() {
  const whyUs = useCMSStore((s) => s.whyUs);
  const statsBand = useCMSStore((s) => s.statsBand);
  const industries = useCMSStore((s) => s.industries);
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

  return (
    <div ref={ref}>
      <section id="why-us">
        <div className="container">
          <div className="sec-head reveal">
            <div className="tag-eyebrow">{whyUs.eyebrow}</div>
            <h2 className="sec-title">{whyUs.title}</h2>
          </div>
          <div className="why-grid reveal-stagger">
            {whyUs.reasons.map((r, i) => (
              <div key={i} className="why-card">
                <div className="why-num">{r.num}</div>
                <div>
                  <div className="why-title">{r.title}</div>
                  <div className="why-body">{r.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-band" id="stats">
        <div className="container">
          <div className="sec-head center reveal" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <div className="tag-eyebrow" style={{ justifyContent: 'center', color: '#F1E4C3' }}>Company Statistics</div>
            <h2 className="sec-title" style={{ color: '#fff' }}>Performance That Speaks for Itself</h2>
          </div>
          <div className="stats-band-grid reveal-stagger">
            {statsBand.stats.map((stat, i) => (
              <div key={i} className="sb-card">
                <div className="sb-num"><StatCounter end={stat.value} suffix={stat.suffix} /></div>
                <div className="sb-divider" />
                <div className="sb-lbl">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-alt" id="industries">
        <div className="container">
          <div className="sec-head center reveal" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <div className="tag-eyebrow" style={{ justifyContent: 'center' }}>Industries Served</div>
            <h2 className="sec-title">Built for Every Commercial Food Buyer</h2>
          </div>
          <div className="industry-grid reveal-stagger">
            {industries.map((ind, i) => (
              <div key={i} className="industry-card">
                <div className="ind-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
                    {ind.icon === 'Building2' ? <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" /> :
                     ind.icon === 'ChefHat' ? <path d="M4 14h16l-1.5 6h-13L4 14zM6 14V8a6 6 0 0112 0v6" /> :
                     ind.icon === 'Store' ? <path d="M3 9l1-5h16l1 5M4 9v11h16V9M9 21v-5h6v5" /> :
                     ind.icon === 'Factory' ? <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /></> :
                     <path d="M12 2v20M5 7h14M5 12h14M5 17h14" />}
                  </svg>
                </div>
                <div className="ind-name">{ind.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .why-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .why-card { background: linear-gradient(135deg,#071A30,#0B2545); border: 1px solid rgba(255,255,255,0.06); border-radius: 24px; padding: 30px; display: flex; flex-direction: column; gap: 16px; align-items: center; text-align: center; transition: box-shadow .35s, transform .35s; }
        .why-card:hover { box-shadow: 0 14px 36px rgba(11,37,69,0.20); transform: translateY(-4px); }
        .why-num { font-family: 'Space Grotesk',sans-serif; font-size: 38px; font-weight: 700; color: #C8A24A; line-height: 1; text-shadow: 0 2px 10px rgba(200,162,74,0.3); }
        .why-title { font-weight: 700; font-size: 15px; color: #FFFFFF; margin-bottom: 8px; }
        .why-body { font-size: 13.5px; color: rgba(255,255,255,0.7); line-height: 1.7; }
        .stats-band { background: linear-gradient(155deg,#071A30,#0B2545 60%,#123A6B); position: relative; overflow: hidden; }
        .stats-band::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0); background-size: 30px 30px; }
        .stats-band-grid { position: relative; z-index: 2; display: grid; grid-template-columns: repeat(4,1fr); gap: 30px; }
        .sb-card { text-align: center; padding: 14px; }
        .sb-num { font-family: 'Space Grotesk',sans-serif; font-size: clamp(2.2rem,3.4vw,3.2rem); font-weight: 700; color: #FFFFFF; }
        .sb-lbl { font-size: 13px; color: rgba(255,255,255,0.6); margin-top: 10px; }
        .sb-divider { width: 34px; height: 2px; background: #C8A24A; margin: 14px auto 0; }
        .industry-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 18px; }
        .industry-card { background: #F5F7FA; border-radius: 16px; padding: 28px 18px; text-align: center; transition: background .35s, transform .35s; }
        .industry-card:hover { background: #0B2545; transform: translateY(-5px); }
        .ind-icon { width: 50px; height: 50px; margin: 0 auto 16px; border-radius: 13px; background: #FFFFFF; display: flex; align-items: center; justify-content: center; color: #0B2545; transition: background .35s, color .35s; }
        .industry-card:hover .ind-icon { background: #C8A24A; color: #071A30; }
        .ind-name { font-size: 13px; font-weight: 600; color: #0B2545; transition: color .35s; }
        .industry-card:hover .ind-name { color: #FFFFFF; }
        @media (max-width: 1080px) { .industry-grid { grid-template-columns: repeat(3,1fr); } }
        @media (max-width: 860px) { .why-grid { grid-template-columns: 1fr; } .stats-band-grid { grid-template-columns: repeat(2,1fr); gap: 34px; } .industry-grid { grid-template-columns: repeat(2,1fr); } }
      `}</style>
    </div>
  );
}
