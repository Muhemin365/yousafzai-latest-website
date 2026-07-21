import { useEffect, useRef } from 'react';

export default function PageBanner({ title, subtitle }) {
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
    el.querySelectorAll('.reveal-up').forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <header className="page-hero">
        <div className="page-hero-bg" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="page-hero-content reveal-up">
            <div className="breadcrumb">
              <span>Home</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
                <path d="M9 18l6-6-6-6" />
              </svg>
              <span>{title}</span>
            </div>
            <h1 className="page-hero-title">{title}</h1>
            {subtitle && <p className="page-hero-sub">{subtitle}</p>}
          </div>
        </div>
      </header>
      <style>{`
        .page-hero {
          position: relative;
          min-height: 280px;
          display: flex;
          align-items: center;
          padding: 140px 0 60px;
          overflow: hidden;
        }
        .page-hero-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(120% 100% at 80% 0%, #173E72 0%, #0B2545 45%, #071A30 100%);
        }
        .page-hero-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0);
          background-size: 34px 34px;
          opacity: .5;
        }
        .page-hero-title {
          font-family: 'Space Grotesk',sans-serif;
          font-weight: 600;
          font-size: clamp(2.2rem, 3.6vw, 3.2rem);
          color: #FFFFFF;
          line-height: 1.1;
          letter-spacing: -0.01em;
          margin-bottom: 16px;
        }
        .page-hero-sub {
          font-size: 16px;
          color: rgba(255,255,255,0.7);
          max-width: 560px;
        }
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          margin-bottom: 20px;
        }
        .breadcrumb svg {
          opacity: 0.5;
        }
        .reveal-up {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1);
        }
        .reveal-up.in {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 860px) {
          .page-hero { min-height: 200px; padding: 120px 0 40px; }
        }
      `}</style>
    </div>
  );
}
