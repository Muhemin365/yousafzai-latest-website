import { useEffect, useRef } from 'react';
import { useCMSStore } from '../store/useCMSStore';

export default function ProcessSection() {
  const process = useCMSStore((s) => s.process);
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

  const icons = {
    Feather: <path d="M12 2C8 7 5 11.5 5 15a7 7 0 0014 0c0-3.5-3-8-7-13z" />,
    FlaskConical: <path d="M9 3h6M10 3v5l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3" />,
    ScanLine: <><path d="M12 3v2m0 14v2m9-9h-2M5 12H3m14.5-6.5l-1.4 1.4M7 17.5l-1.4 1.4m11.9 0L16 17.5M7 6.5L5.6 5.1" /><circle cx="12" cy="12" r="4" /></>,
    Printer: <><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18M7 14h2" /></>,
    Package: <><rect x="4" y="8" width="16" height="11" rx="1.5" /><path d="M8 8V6a4 4 0 018 0v2" /></>,
    Truck: <path d="M3 16V8a1 1 0 011-1h9v9M3 16h11M16 16h2l2-3v-3h-4M6 18a2 2 0 100-4 2 2 0 000 4zM17 18a2 2 0 100-4 2 2 0 000 4z" />,
  };

  return (
    <section id="process" ref={ref}>
      <div className="container">
        <div className="sec-head reveal">
          <div className="tag-eyebrow">Our Process</div>
          <h2 className="sec-title">A Documented, Auditable Process at Every Stage</h2>
        </div>
        <div className="process-grid reveal-stagger">
          {process.map((item, i) => (
            <div key={i} className="proc-card">
              <div className="proc-num">{item.num}</div>
              <div className="proc-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="21" height="21">
                  {icons[item.icon]}
                </svg>
              </div>
              <div className="proc-title">{item.title}</div>
              <div className="proc-body">{item.body}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .process-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        .proc-card { background: #FFFFFF; border: 1px solid #EEF1F5; border-radius: 24px; padding: 30px; position: relative; }
        .proc-num { position: absolute; top: 24px; right: 26px; font-family: 'Space Grotesk',sans-serif; font-size: 32px; font-weight: 700; color: #F1E4C3; -webkit-text-stroke: 1px #C8A24A; }
        .proc-icon { width: 48px; height: 48px; border-radius: 13px; background: #F1E4C3; display: flex; align-items: center; justify-content: center; color: #0B2545; margin-bottom: 20px; }
        .proc-title { font-weight: 700; font-size: 15px; color: #0B2545; margin-bottom: 10px; }
        .proc-body { font-size: 13px; color: #707888; line-height: 1.65; }
        @media (max-width: 1080px) { .process-grid { grid-template-columns: 1fr 1fr; } }
      `}</style>
    </section>
  );
}
