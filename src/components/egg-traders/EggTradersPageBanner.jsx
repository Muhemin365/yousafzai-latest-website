import { useEffect, useRef } from 'react';

export default function EggTradersPageBanner({ title, subtitle }) {
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
    el.querySelectorAll('.et-banner-reveal').forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <header className="et-page-hero">
        <div className="et-page-hero-bg" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="et-page-hero-content et-banner-reveal">
            <div className="et-breadcrumb">
              <span>Home</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
                <path d="M9 18l6-6-6-6" />
              </svg>
              <span>{title}</span>
            </div>
            <h1 className="et-page-hero-title">{title}</h1>
            {subtitle && <p className="et-page-hero-sub">{subtitle}</p>}
          </div>
        </div>
      </header>
      <style>{`
        .et-page-hero { position: relative; min-height: 280px; display: flex; align-items: center; padding: 140px 0 60px; overflow: hidden; background-color: #060e1a; }
        .et-page-hero-bg { position: absolute; inset: 0; background: radial-gradient(120% 120% at 70% 0%, rgba(59,130,246,0.22) 0%, rgba(11,37,69,0.9) 45%, rgba(6,14,26,1) 100%); }
        .et-page-hero-bg::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle at 1px 1px, rgba(200,162,74,0.35) 1px, transparent 0); background-size: 34px 34px; opacity: .5; }
        .et-page-hero-bg::after { content: ''; position: absolute; width: 420px; height: 420px; border-radius: 50%; top: -160px; right: -120px; background: radial-gradient(circle, rgba(200,162,74,0.16), transparent 70%); filter: blur(10px); }
        .et-page-hero-title { font-family: 'Space Grotesk',sans-serif; font-weight: 700; font-size: clamp(2.2rem,3.6vw,3.2rem); background: linear-gradient(135deg, #ffffff 0%, #E5C87A 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1.1; letter-spacing: -0.01em; margin-bottom: 16px; }
        .et-page-hero-sub { font-size: 16px; color: rgba(255,255,255,0.75); max-width: 560px; }
        .et-breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 20px; }
        .et-breadcrumb svg { opacity: 0.5; }
        .et-banner-reveal { opacity: 0; transform: translateY(28px); transition: opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1); }
        .et-banner-reveal.in { opacity: 1; transform: translateY(0); }
        @media (max-width: 860px) { .et-page-hero { min-height: 200px; padding: 120px 0 40px; } .et-page-hero-sub { font-size: 14px; } }
        @media (max-width: 420px) { .et-page-hero { min-height: 160px; padding: 100px 0 32px; } .et-page-hero-title { font-size: clamp(1.6rem,5vw,2rem); } .et-page-hero-sub { font-size: 13px; } }
      `}</style>
    </div>
  );
}
