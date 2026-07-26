import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCMSStore } from '../store/useCMSStore';
import { ShieldCheck, CheckCircle2, ArrowRight, TrendingUp, Feather, Award, Truck, Thermometer, Sparkles, Play, Pause } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const videoClips = [
  {
    url: 'https://assets.mixkit.co/videos/preview/mixkit-chickens-in-a-poultry-farm-42797-large.mp4',
    title: 'Certified Poultry Farm Network',
    sub: 'Modern automated egg harvesting & biosecurity'
  },
  {
    url: 'https://assets.mixkit.co/videos/preview/mixkit-fresh-eggs-in-a-cardboard-tray-41486-large.mp4',
    title: 'Commercial Egg Sorting & Packaging',
    sub: 'UV sanitization, weight grading & shell inspection'
  },
  {
    url: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-fresh-eggs-in-a-nest-41484-large.mp4',
    title: 'Farm Fresh Organic Produce',
    sub: 'Harvested daily from free-range & cage-free flocks'
  }
];

const eggCategories = [
  {
    id: 'table-eggs',
    title: 'Commercial Table Eggs',
    grade: 'GRADE A / SELECT LARGE',
    desc: 'Farm-fresh white and brown table eggs packed in 30-egg trays and 360-egg cartons with strict shell integrity standards.',
    specs: ['Weight: 53g - 63g+', 'Shell Strength: High', 'Packaging: 30s Trays / Cartons'],
    badge: 'TOP SELLER',
    color: '#F59E0B'
  },
  {
    id: 'liquid-egg',
    title: 'Pasteurized Liquid Egg',
    grade: 'INDUSTRIAL GRADE / ISO 22000',
    desc: 'Value-added liquid whole egg, yolk, and egg white (albumen) processed for industrial bakeries, confectioneries, and food processors.',
    specs: ['Whole, Yolk, Albumen', 'Pasteurized 64°C', 'Chilled Bag-in-Box / Totes'],
    badge: 'NEW INNOVATION',
    color: '#3B82F6'
  },
  {
    id: 'hatching-eggs',
    title: 'Hatching & Breeder Eggs',
    grade: 'HIGH HATCHABILITY 88%+',
    desc: 'Fertile hatching eggs produced from monitored parent stocks with high fertility rates for commercial hatcheries.',
    specs: ['Hatchability: 88%+', 'Parent Line Monitored', 'Specialized Molded Trays'],
    badge: 'BREEDER SPEC',
    color: '#10B981'
  },
  {
    id: 'organic-eggs',
    title: 'Free-Range Organic Eggs',
    grade: '100% NATURAL / HERBAL FEED',
    desc: 'Nutrient-dense eggs from free-range hens fed on natural grain rations with rich golden yolks.',
    specs: ['Zero Antibiotics', 'Rich Omega-3 & D3', 'Eco-Pulp Packaging'],
    badge: 'PREMIUM ORGANIC',
    color: '#EC4899'
  }
];

function EggTradersHero({ data }) {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const [activeClipIndex, setActiveClipIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Automatically cycle video clips every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveClipIndex((prev) => (prev + 1) % videoClips.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Update video src when activeClipIndex changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [activeClipIndex]);

  useEffect(() => {
    if (!heroRef.current) return;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo('.et-ticker-bar', { y: -20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 })
        .fromTo('.et-eyebrow-tag', { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 }, '-=0.2')
        .fromTo('.et-title-text', { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 }, '-=0.2')
        .fromTo('.et-body-text', { y: 15, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 }, '-=0.3')
        .fromTo('.et-cta-group', { y: 15, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 }, '-=0.2')
        .fromTo('.et-stat-card', { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1 }, '-=0.3');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <header ref={heroRef} className="et-hero-section">
      {/* Background Video Loop Container */}
      <div className="et-video-bg-container">
        <video
          ref={videoRef}
          className="et-video-element"
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1920&q=80"
        >
          <source src={videoClips[activeClipIndex].url} type="video/mp4" />
        </video>
        {/* Dark Vignette Overlay for High Legibility */}
        <div className="et-video-overlay" />
      </div>

      {/* Grid overlay & glowing ambient golden yolk & green farm orbs */}
      <div className="et-bg-grid" />
      <div className="et-orb et-orb-gold" />
      <div className="et-orb et-orb-green" />

      <div className="container et-hero-grid">
        {/* Left Column: Text & CTAs */}
        <div className="et-hero-left">
          {/* Live Egg Market Ticker */}
          <div className="et-ticker-bar" style={{ visibility: 'hidden' }}>
            <span className="ticker-live-dot" />
            <span className="ticker-label">DAILY EGG MARKET RATE:</span>
            <span className="ticker-val">MARDAN: PKR 285/DOZ</span>
            <span className="ticker-sep">•</span>
            <span className="ticker-val">ATTOCK: PKR 288/DOZ</span>
          </div>

          <div className="et-eyebrow-tag" style={{ visibility: 'hidden' }}>
            {/* Egg SVG Icon */}
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" className="egg-icon">
              <path d="M12 2C8 7 5 11.5 5 15a7 7 0 0014 0c0-3.5-3-8-7-13z" />
            </svg>
            <span>{data.eyebrow || 'POULTRY & EGG TRADING MARKETPLACE'}</span>
          </div>

          <h1 className="et-title-text" style={{ visibility: 'hidden' }}>
            {data.h1Line1 || 'Direct Farm-Fresh'}{' '}
            <span className="et-highlight">{data.h1Highlight || 'Egg Supply & Trading'}</span>{' '}
            {data.h1Line2 || 'Network'}
          </h1>

          <p className="et-body-text" style={{ visibility: 'hidden' }}>{data.body}</p>

          <div className="et-cta-group" style={{ visibility: 'hidden' }}>
            <Link to={data.primaryCta.action} className="et-btn-gold">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M12 2C8 7 5 11.5 5 15a7 7 0 0014 0c0-3.5-3-8-7-13z" />
              </svg>
              <span>{data.primaryCta.label || 'Order Eggs Bulk'}</span>
              <ArrowRight size={16} />
            </Link>

            <Link to={data.secondaryCta.action} className="et-btn-farm">
              <span>View Product Grades</span>
            </Link>
          </div>

          {/* Trust Chips */}
          <div className="et-trust-chips">
            <div className="et-chip">
              <ShieldCheck size={14} className="chip-icon-gold" />
              <span>100% Quality Grading</span>
            </div>
            <div className="et-chip">
              <Truck size={14} className="chip-icon-green" />
              <span>Cold Chain Transport</span>
            </div>
            <div className="et-chip">
              <Thermometer size={14} className="chip-icon-gold" />
              <span>0-4°C Storage</span>
            </div>
          </div>
        </div>

        {/* Right Column: Marketplace Metric Cards */}
        <div className="et-hero-right">
          <div className="et-metrics-grid">
            <div className="et-stat-card" style={{ visibility: 'hidden' }}>
              <div className="stat-icon-wrap">
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M12 2C8 7 5 11.5 5 15a7 7 0 0014 0c0-3.5-3-8-7-13z" />
                </svg>
              </div>
              <span className="stat-val">45,000+</span>
              <span className="stat-lbl">Eggs Processed / Hour</span>
              <div className="stat-accent-bar" />
            </div>

            <div className="et-stat-card" style={{ visibility: 'hidden' }}>
              <div className="stat-icon-wrap">
                <TrendingUp size={22} />
              </div>
              <span className="stat-val">200+</span>
              <span className="stat-lbl">Verified Poultry Farms</span>
              <div className="stat-accent-bar" />
            </div>

            <div className="et-stat-card" style={{ visibility: 'hidden' }}>
              <div className="stat-icon-wrap">
                <Award size={22} />
              </div>
              <span className="stat-val">100%</span>
              <span className="stat-lbl">Grade A Quality Inspected</span>
              <div className="stat-accent-bar" />
            </div>

            <div className="et-stat-card" style={{ visibility: 'hidden' }}>
              <div className="stat-icon-wrap">
                <Truck size={22} />
              </div>
              <span className="stat-val">28+</span>
              <span className="stat-lbl">Cities Distribution Network</span>
              <div className="stat-accent-bar" />
            </div>
          </div>
        </div>
      </div>

      {/* Video Clip Controller Bar */}
      <div className="et-video-bar">
        <div className="et-video-info">
          <span className="live-clip-badge">LIVE EGG TRADE VIDEO</span>
          <span className="video-title">{videoClips[activeClipIndex].title}</span>
          <span className="video-sub">{videoClips[activeClipIndex].sub}</span>
        </div>

        <div className="et-clip-selectors">
          {videoClips.map((clip, idx) => (
            <button
              key={idx}
              onClick={() => setActiveClipIndex(idx)}
              className={`et-clip-btn ${idx === activeClipIndex ? 'is-active' : ''}`}
            >
              <span>0{idx + 1}</span>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        /* ═══════════════════════════════════════
           EGG TRADERS HERO — LIVE BACKGROUND VIDEO CLIPS
           ═══════════════════════════════════════ */
        .et-hero-section {
          position: relative;
          min-height: 94vh;
          background: #071a30;
          color: #fff;
          padding: 150px 0 110px;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .et-video-bg-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }

        .et-video-element {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.45;
          filter: brightness(0.8) contrast(1.1);
          transition: opacity 1s ease-in-out;
        }

        .et-video-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 50% 50%, rgba(7, 26, 48, 0.6) 0%, rgba(7, 26, 48, 0.95) 100%),
            linear-gradient(180deg, rgba(7, 26, 48, 0.82) 0%, rgba(10, 22, 40, 0.96) 100%);
        }

        .et-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
          z-index: 2;
        }

        .et-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(140px);
          pointer-events: none;
          z-index: 2;
        }

        .et-orb-gold {
          width: 550px; height: 550px;
          background: radial-gradient(circle, rgba(245, 158, 11, 0.22), transparent 70%);
          top: -100px; right: -150px;
        }

        .et-orb-green {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(22, 163, 74, 0.18), transparent 70%);
          bottom: -100px; left: -150px;
        }

        .et-hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 60px;
          align-items: center;
          position: relative;
          z-index: 3;
        }

        /* Live Market Ticker */
        .et-ticker-bar {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.35);
          padding: 6px 16px;
          border-radius: 30px;
          font-family: monospace;
          font-size: 11px;
          color: #fef08a;
          margin-bottom: 20px;
        }

        .ticker-live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #ef4444;
          box-shadow: 0 0 10px #ef4444;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.4; }
          100% { opacity: 1; }
        }

        .ticker-label { font-weight: 700; color: #f59e0b; }
        .ticker-val { font-weight: 600; }
        .ticker-sep { color: rgba(255,255,255,0.3); }

        .et-eyebrow-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #f59e0b;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.25);
          padding: 6px 14px;
          border-radius: 30px;
          margin-bottom: 24px;
        }

        .egg-icon { color: #f59e0b; }

        .et-title-text {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(34px, 4.8vw, 56px);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 0 0 24px;
          color: #fff;
        }

        .et-highlight {
          background: linear-gradient(135deg, #ffffff 0%, #f59e0b 50%, #fef08a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .et-body-text {
          font-size: 16.5px;
          color: rgba(255,255,255,0.78);
          line-height: 1.7;
          margin: 0 0 36px;
          max-width: 580px;
        }

        .et-cta-group {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }

        .et-btn-gold {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 15px;
          padding: 15px 30px;
          border-radius: 12px;
          background: linear-gradient(135deg, #f59e0b 0%, #fef08a 100%);
          color: #071a30;
          text-decoration: none;
          transition: transform 0.3s, box-shadow 0.3s;
          box-shadow: 0 10px 30px rgba(245, 158, 11, 0.35);
        }

        .et-btn-gold:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(245, 158, 11, 0.5);
        }

        .et-btn-farm {
          display: inline-flex;
          align-items: center;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 15px;
          padding: 15px 28px;
          border-radius: 12px;
          background: rgba(22, 163, 74, 0.15);
          border: 1px solid rgba(22, 163, 74, 0.4);
          color: #4ade80;
          text-decoration: none;
          transition: background 0.3s, transform 0.3s;
        }

        .et-btn-farm:hover {
          background: rgba(22, 163, 74, 0.28);
          transform: translateY(-3px);
        }

        .et-trust-chips {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .et-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.75);
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(245, 158, 11, 0.25);
          padding: 6px 14px;
          border-radius: 8px;
        }

        .chip-icon-gold { color: #f59e0b; }
        .chip-icon-green { color: #4ade80; }

        /* Metrics Cards */
        .et-metrics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .et-stat-card {
          position: relative;
          background: rgba(7, 26, 48, 0.7);
          border: 1px solid rgba(245, 158, 11, 0.28);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 28px 24px;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          transition: border-color 0.4s, transform 0.4s;
        }

        .et-stat-card:hover {
          border-color: rgba(245, 158, 11, 0.6);
          transform: translateY(-4px);
          box-shadow: 0 20px 50px rgba(245, 158, 11, 0.15);
        }

        .stat-icon-wrap {
          color: #f59e0b;
          margin-bottom: 4px;
        }

        .stat-val {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 30px;
          font-weight: 700;
          color: #fff;
        }

        .stat-lbl {
          font-size: 12.5px;
          color: rgba(255,255,255,0.65);
          line-height: 1.4;
        }

        .stat-accent-bar {
          width: 30px;
          height: 3px;
          background: linear-gradient(90deg, #f59e0b, #4ade80);
          border-radius: 2px;
          margin-top: 6px;
        }

        /* Video Clip Controller Bar */
        .et-video-bar {
          position: absolute;
          bottom: 24px;
          left: 0; right: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 32px;
          z-index: 10;
        }

        .et-video-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .live-clip-badge {
          font-family: monospace;
          font-size: 10px;
          font-weight: 700;
          color: #f59e0b;
          background: rgba(245, 158, 11, 0.15);
          border: 1px solid rgba(245, 158, 11, 0.3);
          padding: 4px 10px;
          border-radius: 6px;
        }

        .video-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #fff;
        }

        .video-sub {
          font-family: monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.5);
        }

        .et-clip-selectors {
          display: flex;
          gap: 8px;
        }

        .et-clip-btn {
          font-family: monospace;
          font-size: 11px;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.6);
          cursor: pointer;
          transition: all 0.3s;
        }

        .et-clip-btn.is-active {
          background: #f59e0b;
          color: #071a30;
          border-color: #f59e0b;
          box-shadow: 0 0 12px rgba(245, 158, 11, 0.5);
        }

        @media (max-width: 900px) {
          .et-hero-grid { grid-template-columns: 1fr; }
          .et-hero-section { padding: 120px 16px 80px; }
          .video-sub { display: none; }
        }
      `}</style>
    </header>
  );
}

{/* Egg Products & Grading Showcase Section */}
function EggProductsShowcase() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    let ctx = gsap.context(() => {
      gsap.fromTo('.et-prod-head',
        { y: 30, autoAlpha: 0 },
        {
          y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.et-prod-head', start: 'top 85%' }
        }
      );

      gsap.utils.toArray('.et-prod-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 50, autoAlpha: 0 },
          {
            y: 0, autoAlpha: 1, duration: 0.8, delay: i * 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%' }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="et-prod-section">
      <div className="container">
        <div className="et-prod-head">
          <span className="et-eyebrow-text">POULTRY PRODUCTS // GRADES</span>
          <h2 className="et-sec-title">Specialized Egg Product Portfolio</h2>
          <p className="et-sec-sub">Supplying fresh table eggs, pasteurized liquid egg products, and breeding stock across Pakistan.</p>
        </div>

        <div className="et-prod-grid">
          {eggCategories.map((cat) => (
            <div key={cat.id} className="et-prod-card" style={{ visibility: 'hidden' }}>
              <div className="prod-top-bar">
                <span className="prod-badge" style={{ background: `${cat.color}20`, border: `1px solid ${cat.color}50`, color: cat.color }}>
                  {cat.badge}
                </span>
                <span className="prod-grade">{cat.grade}</span>
              </div>

              <h3 className="prod-title">{cat.title}</h3>
              <p className="prod-desc">{cat.desc}</p>

              <div className="prod-specs-list">
                {cat.specs.map((spec, i) => (
                  <div key={i} className="prod-spec-item">
                    <CheckCircle2 size={14} style={{ color: cat.color }} />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              <Link to="/egg-traders/contact" className="prod-order-btn" style={{ borderColor: `${cat.color}50` }}>
                <span>Inquire Bulk Supply</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .et-prod-section {
          background: #071a30;
          color: #fff;
          padding: 120px 24px;
          position: relative;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .et-prod-head {
          text-align: center;
          max-width: 750px;
          margin: 0 auto 70px;
        }

        .et-eyebrow-text {
          font-family: monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          color: #f59e0b;
          display: block;
          margin-bottom: 14px;
        }

        .et-sec-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(32px, 4.2vw, 48px);
          font-weight: 700;
          margin: 0 0 16px;
          background: linear-gradient(135deg, #ffffff 0%, #f59e0b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .et-sec-sub {
          font-size: 16px;
          color: rgba(255,255,255,0.65);
          line-height: 1.7;
        }

        .et-prod-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }

        .et-prod-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(16px);
          border-radius: 24px;
          padding: 36px 32px;
          display: flex;
          flex-direction: column;
          transition: border-color 0.4s, transform 0.4s, box-shadow 0.4s;
        }

        .et-prod-card:hover {
          border-color: rgba(245, 158, 11, 0.5);
          transform: translateY(-6px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
        }

        .prod-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .prod-badge {
          font-family: monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 4px 10px;
          border-radius: 6px;
        }

        .prod-grade {
          font-family: monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.08em;
        }

        .prod-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 10px;
        }

        .prod-desc {
          font-size: 14.5px;
          color: rgba(255,255,255,0.65);
          line-height: 1.65;
          margin: 0 0 24px;
          flex-grow: 1;
        }

        .prod-specs-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 28px;
          background: rgba(255,255,255,0.02);
          padding: 16px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.04);
        }

        .prod-spec-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: monospace;
          font-size: 12px;
          color: rgba(255,255,255,0.8);
        }

        .prod-order-btn {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 20px;
          border-radius: 10px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.12);
          color: #fff;
          font-family: monospace;
          font-size: 12.5px;
          text-decoration: none;
          transition: all 0.3s;
        }

        .prod-order-btn:hover {
          background: #f59e0b;
          color: #071a30;
          border-color: #f59e0b;
          font-weight: 700;
        }

        @media (max-width: 860px) {
          .et-prod-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

function EggTradersHomeAbout({ data }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    let ctx = gsap.context(() => {
      gsap.fromTo('.et-about-head',
        { y: 30, autoAlpha: 0 },
        {
          y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.et-about-head', start: 'top 85%' }
        }
      );

      gsap.fromTo('.et-quote-card',
        { x: -40, autoAlpha: 0 },
        {
          x: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.et-quote-card', start: 'top 85%' }
        }
      );

      gsap.fromTo('.et-feat-card',
        { x: 40, autoAlpha: 0 },
        {
          x: 0, autoAlpha: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.et-feats-col', start: 'top 85%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="et-about-section">
      <div className="container">
        <div className="et-about-head">
          <span className="et-eyebrow-text">{data.eyebrow || 'OUR COMMITMENT TO QUALITY'}</span>
          <h2 className="et-sec-title">{data.title || 'Transforming Egg Trading'}</h2>
          <p className="et-sec-sub">{data.subtitle}</p>
        </div>

        <div className="et-about-layout">
          {/* Quote Banner with Golden Egg Yolk & Navy Blend */}
          <div className="et-quote-card" style={{ visibility: 'hidden' }}>
            <span className="quote-badge">CHAIRMAN'S EGG TRADING VISION</span>
            <p className="quote-text">"{data.quote}"</p>
            <span className="quote-footer">— {data.quoteFooter || 'M/S Yousafzai Eggs Traders & Poultry Farms'}</span>
          </div>

          {/* Features Column */}
          <div className="et-feats-col">
            {data.features.map((feat, i) => (
              <div key={i} className="et-feat-card" style={{ visibility: 'hidden' }}>
                <div className="feat-icon-box">
                  {feat.icon === 'Feather' ? <Feather size={20} /> :
                   feat.icon === 'TrendingUp' ? <TrendingUp size={20} /> :
                   <ShieldCheck size={20} />}
                </div>
                <div className="feat-info">
                  <h3 className="feat-title">{feat.title}</h3>
                  <p className="feat-body">{feat.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="et-about-action">
          <Link to="/egg-traders/about" className="et-learn-btn">
            <span>Learn More About Egg Traders</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style>{`
        .et-about-section {
          background: #071a30;
          color: #fff;
          padding: 120px 24px;
          position: relative;
        }

        .et-about-head {
          text-align: center;
          max-width: 750px;
          margin: 0 auto 70px;
        }

        .et-eyebrow-text {
          font-family: monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          color: #f59e0b;
          display: block;
          margin-bottom: 14px;
        }

        .et-sec-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(32px, 4.2vw, 48px);
          font-weight: 700;
          margin: 0 0 16px;
          background: linear-gradient(135deg, #ffffff 0%, #f59e0b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .et-sec-sub {
          font-size: 16px;
          color: rgba(255,255,255,0.65);
          line-height: 1.7;
        }

        .et-about-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
        }

        .et-quote-card {
          position: relative;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.18) 0%, rgba(11, 37, 69, 0.7) 100%);
          border: 1px solid rgba(245, 158, 11, 0.4);
          border-radius: 24px;
          padding: 44px 36px;
          backdrop-filter: blur(16px);
        }

        .quote-badge {
          font-family: monospace;
          font-size: 10px;
          color: #f59e0b;
          letter-spacing: 0.12em;
          display: block;
          margin-bottom: 18px;
        }

        .quote-text {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 22px;
          font-weight: 500;
          line-height: 1.6;
          color: #fff;
          margin: 0 0 24px;
        }

        .quote-footer {
          font-family: monospace;
          font-size: 12px;
          color: #4ade80;
          letter-spacing: 0.08em;
        }

        .et-feats-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .et-feat-card {
          display: flex;
          gap: 18px;
          padding: 22px;
          border-radius: 16px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: blur(12px);
          transition: border-color 0.4s, transform 0.4s;
        }

        .et-feat-card:hover {
          border-color: rgba(245, 158, 11, 0.45);
          transform: translateX(6px);
        }

        .feat-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(245, 158, 11, 0.15);
          border: 1px solid rgba(245, 158, 11, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #f59e0b;
          flex-shrink: 0;
        }

        .feat-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 17px;
          font-weight: 700;
          margin: 0 0 6px;
          color: #fff;
        }

        .feat-body {
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          line-height: 1.6;
          margin: 0;
        }

        .et-about-action {
          text-align: center;
          margin-top: 60px;
        }

        .et-learn-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: monospace;
          font-size: 13px;
          font-weight: 700;
          color: #f59e0b;
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.35);
          padding: 14px 28px;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.3s;
        }

        .et-learn-btn:hover {
          background: #f59e0b;
          color: #071a30;
          box-shadow: 0 10px 25px rgba(245, 158, 11, 0.4);
        }

        @media (max-width: 900px) {
          .et-about-layout { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

export default function EggTradersHomePage() {
  const eggTraders = useCMSStore((s) => s.eggTraders);

  return (
    <>
      <EggTradersHero data={eggTraders.hero} />
      <EggProductsShowcase />
      <EggTradersHomeAbout data={eggTraders.about} />
    </>
  );
}
