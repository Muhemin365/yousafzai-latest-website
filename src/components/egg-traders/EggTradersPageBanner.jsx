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
        .et-page-hero { position: relative; min-height: 280px; display: flex; align-items: center; padding: 140px 0 60px; overflow: hidden; }
        .et-page-hero-bg { position: absolute; inset: 0; background: radial-gradient(120% 100% at 80% 0%, #059669 0%, #0D6B3D 45%, #064E3B 100%); }
        .et-page-hero-bg::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0); background-size: 34px 34px; opacity: .5; }
        .et-page-hero-title { font-family: 'Space Grotesk',sans-serif; font-weight: 600; font-size: clamp(2.2rem,3.6vw,3.2rem); color: #FFFFFF; line-height: 1.1; letter-spacing: -0.01em; margin-bottom: 16px; }
        .et-page-hero-sub { font-size: 16px; color: rgba(255,255,255,0.7); max-width: 560px; }
        .et-breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(255,255,255,0.45); margin-bottom: 20px; }
        .et-breadcrumb svg { opacity: 0.5; }
        .et-banner-reveal { opacity: 0; transform: translateY(28px); transition: opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1); }
        .et-banner-reveal.in { opacity: 1; transform: translateY(0); }
        @media (max-width: 860px) { .et-page-hero { min-height: 200px; padding: 120px 0 40px; } .et-page-hero-sub { font-size: 14px; } }
        @media (max-width: 420px) { .et-page-hero { min-height: 160px; padding: 100px 0 32px; } .et-page-hero-title { font-size: clamp(1.6rem,5vw,2rem); } .et-page-hero-sub { font-size: 13px; } }
      `}</style>
    </div>
  );
}
