import { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCMSStore } from '../store/useCMSStore';

function Counter({ end, suffix }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Remove '+' or ',' to parse correctly, we will just parse float and put suffix back.
            // But the current store might have '1000' and suffix '+'
            const target = parseInt(end, 10);
            let start = 0;
            const dur = 1500; // 1.5s
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);
  return (
    <span ref={ref}>
      {count >= 1000 ? (count / 1000).toFixed(count % 1000 !== 0 ? 1 : 0) + 'K' : count}{suffix}
    </span>
  );
}

function Particles() {
  const particles = useMemo(() => Array.from({ length: 40 }), []);
  return (
    <div className="particles-container">
      {particles.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = 15 + Math.random() * 15;
        const size = 2 + Math.random() * 3;
        return (
          <div
            key={i}
            className="particle"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              width: `${size}px`,
              height: `${size}px`,
            }}
          />
        );
      })}
    </div>
  );
}

const slideImages = [
  'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=1920&q=80', // Farm
  'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=1920&q=80', // Processing
  'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=1920&q=80', // Eggs
];

function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slideImages.length);
    }, 6000); // change every 6 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-slideshow">
      {slideImages.map((src, idx) => (
        <div
          key={idx}
          className={`slide-img ${idx === current ? 'active' : ''}`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
      <div className="slide-overlay" />
    </div>
  );
}

export default function HeroSection() {
  const hero = useCMSStore((s) => s.hero);
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const visual = el.querySelector('.hero-visual');
    if (!visual) return;
    
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 14;
      visual.style.transform = `translate(${x}px, ${y}px)`;
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <header className="hero hero-enter" id="home" ref={heroRef}>
        <HeroSlideshow />
        <Particles />
        <div className="hero-glow" />
        <div className="hero-glow b" />
        
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">
              <span className="dot" />
              {hero.eyebrow}
            </div>
            <h1>
              {hero.h1Line1}<br />Built for <em>{hero.h1Highlight}</em>
            </h1>
            <p className="lead">{hero.body}</p>
            <div className="hero-actions">
              <Link to={hero.primaryCta.action} className="btn btn-gold btn-shine" data-ripple>
                <span>
                  {hero.primaryCta.label}
                  <svg className="btn-arrow" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
                <div className="shine-element"></div>
              </Link>
              <Link to={hero.secondaryCta.action} className="btn btn-outline" data-ripple>
                <span>{hero.secondaryCta.label}</span>
              </Link>
            </div>
            <div className="trust-row">
              <div className="t-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M12 2l8 4v6c0 5-3.6 8-8 10-4.4-2-8-5-8-10V6l8-4z" />
                </svg>
                ISO 22000 Certified
              </div>
              <div className="t-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <circle cx="12" cy="12" r="9" /><path d="M9 12l2 2 4-4" />
                </svg>
                PSQCA & Halal Compliant
              </div>
              <div className="t-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M3 11l9-8 9 8M5 10v10h14V10" />
                </svg>
                25+ Cities Served
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hv-core">
              <svg className="egg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="108" height="108">
                <path d="M12 2C8 7 5 11.5 5 15a7 7 0 0014 0c0-3.5-3-8-7-13z" />
              </svg>
              
              {/* Orbiting Ring */}
              <div className="hv-orbit-ring">
                <div className="orbit-dot d1"></div>
                <div className="orbit-dot d2"></div>
                <div className="orbit-dot d3"></div>
              </div>
            </div>
            {hero.cards.map((card, i) => {
              // Extract numeric part for counter
              const numericValue = parseInt(card.value.replace(/[^0-9]/g, ''), 10);
              const suffix = card.value.replace(/[0-9kK,]/g, '');
              
              return (
                <div key={i} className={`hv-card c${i + 1}`}>
                  <div className="hv-num">
                    <Counter end={numericValue || 520000} suffix={suffix || '+'} />
                  </div>
                  <div className="hv-lbl">{card.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </header>

      <div className="stat-strip stat-strip-enter">
        <div className="container">
          {hero.stats.map((stat, i) => (
            <div key={i} className="stat">
              <div className="stat-num">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="stat-cap">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          padding: 140px 0 90px;
          background-color: #060E1A;
        }

        /* Background Slideshow */
        .hero-slideshow {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .slide-img {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0;
          transition: opacity 2s ease-in-out, transform 8s ease-in-out;
          transform: scale(1.05);
          filter: grayscale(10%);
        }
        .slide-img.active {
          opacity: 0.55;
          transform: scale(1);
        }
        .slide-overlay {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(120% 100% at 80% 0%, rgba(18,58,107,0.55) 0%, rgba(11,37,69,0.68) 45%, rgba(6,14,26,0.88) 100%),
            linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 25%);
        }
        .slide-overlay::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 60%, #060E1A 100%);
        }

        /* Particle Background */
        .particles-container { position: absolute; inset: 0; pointer-events: none; z-index: 1; overflow: hidden; opacity: 0.12; }
        .particle { position: absolute; bottom: -10px; background: #C8A24A; border-radius: 50%; box-shadow: 0 0 6px #C8A24A; animation: driftUp linear infinite; }
        @keyframes driftUp {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-120vh) translateX(30px); opacity: 0; }
        }

        .hero-glow {
          position: absolute; width: 680px; height: 680px; border-radius: 50%;
          background: radial-gradient(circle, rgba(200,162,74,0.16), transparent 70%);
          top: -220px; right: -180px; filter: blur(10px); z-index: 1;
          animation: float1 12s ease-in-out infinite;
        }
        .hero-glow.b {
          width: 420px; height: 420px; background: radial-gradient(circle, rgba(60,120,210,0.2), transparent 70%);
          bottom: -160px; left: -120px; top: auto; right: auto;
          animation: float2 14s ease-in-out infinite;
        }
        @keyframes float1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-30px,30px); } }
        @keyframes float2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(25px,-22px); } }

        .hero-grid { position: relative; z-index: 2; display: grid; grid-template-columns: 1.05fr .95fr; gap: 60px; align-items: center; }
        
        .eyebrow {
          display: inline-flex; align-items: center; gap: 9px;
          font-size: 11.5px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase;
          color: #F2E7C9; background: rgba(200,162,74,0.1);
          border: 1px solid rgba(200,162,74,0.3); padding: 8px 16px; border-radius: 30px;
          margin-bottom: 28px;
        }
        .eyebrow .dot {
          width: 6px; height: 6px; border-radius: 50%; background: #C8A24A;
          box-shadow: 0 0 0 0 rgba(200,162,74,0.6); animation: pulseGold 2s infinite;
        }
        @keyframes pulseGold {
          0% { box-shadow: 0 0 0 0 rgba(200,162,74,0.55); }
          70% { box-shadow: 0 0 0 8px rgba(200,162,74,0); }
          100% { box-shadow: 0 0 0 0 rgba(200,162,74,0); }
        }

        .hero h1 {
          font-family: 'Space Grotesk',sans-serif; font-weight: 700;
          font-size: clamp(2.6rem, 4.6vw, 4.3rem); line-height: 1.06;
          color: #FFFFFF; letter-spacing: -0.02em; margin-bottom: 24px;
        }
        .hero h1 em {
          font-style: normal;
          background: linear-gradient(135deg, #ffffff 0%, #E5C87A 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
        }
        .hero p.lead { font-size: 17px; color: rgba(255,255,255,0.72); max-width: 520px; margin-bottom: 38px; }
        
        .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 54px; }
        
        .btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          font-family: 'Inter',sans-serif; font-weight: 600; font-size: 13.5px;
          padding: 13px 26px; border-radius: 12px; border: none; cursor: pointer;
          position: relative; overflow: hidden;
          transition: transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s cubic-bezier(.22,1,.36,1), background .25s;
          white-space: nowrap; text-decoration: none;
        }
        .btn span { position: relative; z-index: 2; display: flex; align-items: center; gap: 8px; }
        .btn-arrow { transition: transform 0.3s ease; }
        .btn:hover .btn-arrow { transform: translateX(5px); }

        .btn-gold {
          background: linear-gradient(120deg,#A8862F,#C8A24A 55%,#F2E7C9);
          color: #060E1A; box-shadow: 0 10px 24px rgba(200,162,74,0.3);
        }
        .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 16px 32px rgba(200,162,74,0.45), 0 0 20px rgba(200,162,74,0.35); }
        
        /* Shine Animation */
        .shine-element {
          position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%);
          transform: skewX(-20deg); animation: shinePass 8s infinite; z-index: 1;
        }
        @keyframes shinePass {
          0%, 80% { left: -100%; }
          100% { left: 200%; }
        }

        .btn-outline { background: transparent; border: 1.4px solid rgba(255,255,255,0.45); color: #FFFFFF; }
        .btn-outline:hover { border-color: #C8A24A; background: rgba(255,255,255,0.06); }

        .trust-row { display: flex; align-items: center; gap: 28px; flex-wrap: wrap; }
        .trust-row .t-item { display: flex; align-items: center; gap: 9px; font-size: 12.5px; color: rgba(255,255,255,0.62); font-weight: 500; }
        .trust-row svg { width: 16px; height: 16px; color: #C8A24A; flex-shrink: 0; }

        .hero-visual { position: relative; height: 520px; }
        
        /* Central Egg Breathing & Glow */
        .hv-core {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
          width: 300px; height: 300px; border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, rgba(200,162,74,0.15), transparent 60%);
          display: flex; align-items: center; justify-content: center; color: #C8A24A;
        }
        .egg-icon {
          animation: drawEgg 2s ease-out forwards, breatheEgg 6s ease-in-out infinite 2s;
          stroke-dasharray: 100; stroke-dashoffset: 100;
        }
        @keyframes drawEgg { to { stroke-dashoffset: 0; } }
        @keyframes breatheEgg {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(200,162,74,0)); }
          50% { transform: scale(1.03); filter: drop-shadow(0 0 15px rgba(200,162,74,0.6)); }
        }

        /* Orbiting Ring */
        .hv-orbit-ring {
          position: absolute; inset: 20px; border-radius: 50%;
          border: 1px dashed rgba(255,255,255,0.15); animation: spinOrbit 25s linear infinite;
        }
        .orbit-dot { position: absolute; width: 6px; height: 6px; background: #C8A24A; border-radius: 50%; box-shadow: 0 0 8px #C8A24A; }
        .orbit-dot.d1 { top: -3px; left: 50%; transform: translateX(-50%); }
        .orbit-dot.d2 { bottom: 20%; left: 10%; }
        .orbit-dot.d3 { bottom: 20%; right: 10%; }
        @keyframes spinOrbit { to { transform: rotate(360deg); } }

        /* Floating Cards */
        .hv-card {
          position: absolute; background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.14); backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-radius: 18px; padding: 18px 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.25);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hv-card:hover { transform: translateY(-8px) scale(1.02) !important; box-shadow: 0 24px 60px rgba(200,162,74,0.2); border-color: rgba(200,162,74,0.5); }
        .hv-card:hover .hv-num { text-shadow: 0 0 10px rgba(255,255,255,0.4); }
        .hv-card .hv-num { font-family: 'Space Grotesk',sans-serif; font-size: 26px; font-weight: 700; color: #FFFFFF; line-height: 1; transition: text-shadow 0.3s ease; }
        .hv-card .hv-lbl { font-size: 11px; color: rgba(255,255,255,0.6); margin-top: 4px; letter-spacing: .02em; }
        
        .hv-card.c1 { top: 6%; left: 2%; animation: bobCard 6s ease-in-out infinite 0s; }
        .hv-card.c2 { top: 40%; right: 0%; animation: bobCard 6s ease-in-out infinite 1.4s; }
        .hv-card.c3 { bottom: 6%; left: 10%; animation: bobCard 6s ease-in-out infinite 2.6s; }
        
        @keyframes bobCard { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

        /* Disable motion */
        @media (prefers-reduced-motion: reduce) {
          .hv-card, .hv-orbit-ring, .egg-icon, .hero-glow, .particle, .shine-element, .eyebrow .dot { animation: none !important; }
        }

        .stat-strip { background: linear-gradient(135deg,#060E1A,#0B2545); border-top: 1px solid rgba(255,255,255,0.06); position: relative; z-index: 3; margin-top: -1px; }
        .stat-strip .container { display: grid; grid-template-columns: repeat(4,1fr); padding: 46px 32px; }
        .stat-strip .stat { text-align: center; border-right: 1px solid rgba(255,255,255,0.1); padding: 0 18px; }
        .stat-strip .stat:last-child { border-right: none; }
        .stat-num { font-family: 'Space Grotesk',sans-serif; font-size: clamp(1.8rem,2.6vw,2.6rem); font-weight: 700; color: #FFFFFF; display: flex; justify-content: center; align-items: baseline; gap: 3px; }
        .stat-cap { font-size: 12.5px; color: rgba(255,255,255,0.7); margin-top: 6px; }

        .hero-enter { animation: heroIn 1s cubic-bezier(.22,1,.36,1) both; }
        @keyframes heroIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .hero-enter .hero-grid > * { animation: heroSlide .8s cubic-bezier(.22,1,.36,1) both; }
        .hero-enter .hero-grid > *:nth-child(1) { animation-delay: .2s; }
        .hero-enter .hero-grid > *:nth-child(2) { animation-delay: .35s; }
        
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr; }
          .hero-visual { display: none; }
          .stat-strip .container { grid-template-columns: repeat(2,1fr); gap: 24px; }
          .stat-strip .stat { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; }
        }
        @media (max-width: 480px) {
          .hero { padding: 120px 0 60px; }
          .hero p.lead { font-size: 16px; }
          .btn { padding: 12px 22px; font-size: 13px; }
          .trust-row { gap: 18px; }
          .stat-strip .container { padding: 32px 20px; }
        }
      `}</style>
    </>
  );
}
