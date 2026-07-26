import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { 
    id: '1960', 
    year: '1960', 
    title: 'Retail Origins', 
    desc: 'Established retail shop opposite Mardan Press Club for egg trading.',
    img: 'https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?w=1920&q=80',
    stats: '1ST RETAIL HUB',
    metric: '60+',
    metricLabel: 'Years of Trust'
  },
  { 
    id: '2000', 
    year: '2000', 
    title: 'Supply Network', 
    desc: 'Built strong supply network connecting farms to markets across KPK.',
    img: 'https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?w=1920&q=80',
    stats: 'B2B LOGISTICS',
    metric: '100+',
    metricLabel: 'Partner Farms'
  },
  { 
    id: '2020', 
    year: '2020', 
    title: 'Sales Expansion', 
    desc: 'Opened second sales point at Haji Shah Morh, Attock.',
    img: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1920&q=80',
    stats: 'PUNJAB EXPANSION',
    metric: '2',
    metricLabel: 'Sales Points'
  },
  { 
    id: '2022', 
    year: '2022', 
    title: 'Poultry Farm', 
    desc: 'Established poultry farm at China Chowk, Attock, Punjab.',
    img: 'https://images.unsplash.com/photo-1601444571669-02e5bb5756eb?w=1920&q=80',
    stats: 'VERTICAL INTEGRATION',
    metric: '10K+',
    metricLabel: 'Daily Capacity'
  }
];

export default function SceneOurStory() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  useEffect(() => {
    if (!sectionRef.current) return;

    let ctx = gsap.context(() => {

      // ── Header reveal ──
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
        }
      });
      headerTl
        .fromTo('.leg-eyebrow', { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' })
        .fromTo('.leg-heading', { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out' }, '-=0.3')
        .fromTo('.leg-subtext', { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .fromTo('.leg-divider-line', { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power2.inOut' }, '-=0.3');

      // ── Vertical line draw ──
      gsap.fromTo('.leg-vline-fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.leg-timeline',
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 0.8,
          }
        }
      );

      // ── Each card ──
      gsap.utils.toArray('.leg-milestone').forEach((card, i) => {
        const isLeft = i % 2 === 0;

        // Card body slide in
        gsap.fromTo(card.querySelector('.leg-card-body'),
          { x: isLeft ? -80 : 80, autoAlpha: 0, rotationY: isLeft ? -6 : 6 },
          {
            x: 0,
            autoAlpha: 1,
            rotationY: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            }
          }
        );

        // Image parallax inside the card
        gsap.fromTo(card.querySelector('.leg-card-img img'),
          { scale: 1.15 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        );

        // Node glow pulse
        ScrollTrigger.create({
          trigger: card,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => setActiveIdx(i),
          onEnterBack: () => setActiveIdx(i),
        });

        // Metric counter animation
        const metricEl = card.querySelector('.leg-metric-value');
        if (metricEl) {
          gsap.fromTo(metricEl,
            { autoAlpha: 0, y: 20, scale: 0.8 },
            {
              autoAlpha: 1, y: 0, scale: 1,
              duration: 0.8,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: card,
                start: 'top 65%',
              }
            }
          );
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── 3D tilt on hover ──
  const handleMouseMove = (e) => {
    const card = e.currentTarget.querySelector('.leg-card-body');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotationY: x * 6,
      rotationX: y * -4,
      transformPerspective: 1200,
      ease: 'power2.out',
      duration: 0.4,
    });
    // Glow follow
    card.style.setProperty('--gx', `${(x + 0.5) * 100}%`);
    card.style.setProperty('--gy', `${(y + 0.5) * 100}%`);
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget.querySelector('.leg-card-body');
    if (!card) return;
    gsap.to(card, { rotationY: 0, rotationX: 0, ease: 'power3.out', duration: 0.6 });
  };

  return (
    <section ref={sectionRef} className="leg-section">

      {/* ── Ambient background particles ── */}
      <div className="leg-ambient">
        <div className="leg-orb leg-orb-1" />
        <div className="leg-orb leg-orb-2" />
      </div>

      {/* ── Header ── */}
      <div ref={headerRef} className="leg-header">
        <span className="leg-eyebrow">ORGANIZATIONAL_EVOLUTION // SINCE_1960</span>
        <h2 className="leg-heading">Our Legacy</h2>
        <p className="leg-subtext">Six decades of growth — from a single retail shop to a vertically integrated enterprise.</p>
        <div className="leg-divider-line" />
      </div>

      {/* ── Timeline ── */}
      <div className="leg-timeline">

        {/* Vertical Line */}
        <div className="leg-vline">
          <div className="leg-vline-fill" />
        </div>

        {milestones.map((item, index) => {
          const isLeft = index % 2 === 0;
          const isActive = activeIdx === index;

          return (
            <div
              key={item.id}
              className={`leg-milestone ${isLeft ? 'ms-left' : 'ms-right'}`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* ── Node on line ── */}
              <div className={`leg-node ${isActive ? 'node-active' : ''}`}>
                <div className="leg-node-ring" />
                <div className="leg-node-dot" />
                {isActive && <div className="leg-node-pulse" />}
              </div>

              {/* ── Year Label ── */}
              <div className={`leg-year-label ${isActive ? 'year-active' : ''}`}>
                {item.year}
              </div>

              {/* ── Card ── */}
              <div className="leg-card-body">
                {/* Hover Glow */}
                <div className="leg-card-glow" />

                {/* Image */}
                <div className="leg-card-img">
                  <img src={item.img} alt={item.title} loading="lazy" />
                  <div className="leg-card-img-overlay" />
                  <div className="leg-card-year-bg">{item.year}</div>
                </div>

                {/* Info */}
                <div className="leg-card-info">
                  <div className="leg-card-top-row">
                    <span className="leg-card-tag">{item.stats}</span>
                    <div className="leg-metric">
                      <span className="leg-metric-value">{item.metric}</span>
                      <span className="leg-metric-label">{item.metricLabel}</span>
                    </div>
                  </div>
                  <h3 className="leg-card-title">{item.title}</h3>
                  <p className="leg-card-desc">{item.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        /* ═══════════════════════════════════════
           SECTION BASE
           ═══════════════════════════════════════ */
        .leg-section {
          background: #040d1a;
          color: #fff;
          padding: 140px 24px 120px;
          position: relative;
          overflow: hidden;
        }

        /* ── Ambient orbs ── */
        .leg-ambient {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .leg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.12;
        }

        .leg-orb-1 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, #c8a24a 0%, transparent 70%);
          top: 10%;
          left: -200px;
          animation: orbFloat1 12s ease-in-out infinite alternate;
        }

        .leg-orb-2 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #4a8ec8 0%, transparent 70%);
          bottom: 5%;
          right: -150px;
          animation: orbFloat2 15s ease-in-out infinite alternate;
        }

        @keyframes orbFloat1 {
          0% { transform: translate(0, 0); }
          100% { transform: translate(80px, 60px); }
        }

        @keyframes orbFloat2 {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-60px, -80px); }
        }

        /* ═══════════════════════════════════════
           HEADER
           ═══════════════════════════════════════ */
        .leg-header {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 700px;
          margin: 0 auto 100px;
        }

        .leg-eyebrow {
          font-family: monospace;
          font-size: 12px;
          letter-spacing: 0.2em;
          color: #c8a24a;
          display: block;
          margin-bottom: 16px;
          visibility: hidden; /* GSAP handles */
        }

        .leg-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(40px, 6vw, 64px);
          font-weight: 700;
          margin: 0 0 20px;
          background: linear-gradient(135deg, #ffffff 0%, #c8a24a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          visibility: hidden;
        }

        .leg-subtext {
          font-size: 17px;
          color: rgba(255,255,255,0.5);
          line-height: 1.7;
          margin: 0 0 30px;
          visibility: hidden;
        }

        .leg-divider-line {
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, #c8a24a, #ffe6a0);
          margin: 0 auto;
          transform-origin: center;
          transform: scaleX(0);
          border-radius: 2px;
        }

        /* ═══════════════════════════════════════
           TIMELINE
           ═══════════════════════════════════════ */
        .leg-timeline {
          position: relative;
          max-width: 1100px;
          margin: 0 auto;
          z-index: 2;
        }

        /* Vertical line */
        .leg-vline {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: rgba(255,255,255,0.04);
          transform: translateX(-50%);
          z-index: 1;
        }

        .leg-vline-fill {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, #c8a24a 0%, #ffe6a0 50%, #c8a24a 100%);
          transform-origin: top center;
          transform: scaleY(0);
          box-shadow: 0 0 16px rgba(200,162,74,0.25);
        }

        /* ═══════════════════════════════════════
           MILESTONE CARD
           ═══════════════════════════════════════ */
        .leg-milestone {
          position: relative;
          width: 50%;
          padding: 0 50px 100px;
        }

        .leg-milestone.ms-left {
          margin-left: 0;
          padding-right: 60px;
        }

        .leg-milestone.ms-right {
          margin-left: 50%;
          padding-left: 60px;
        }

        /* ── Node ── */
        .leg-node {
          position: absolute;
          top: 40px;
          z-index: 10;
          width: 20px;
          height: 20px;
        }

        .ms-left .leg-node {
          right: -10px;
        }

        .ms-right .leg-node {
          left: -10px;
        }

        .leg-node-ring {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid rgba(200,162,74,0.15);
          transition: border-color 0.5s;
        }

        .node-active .leg-node-ring {
          border-color: rgba(200,162,74,0.5);
        }

        .leg-node-dot {
          position: absolute;
          inset: 3px;
          border-radius: 50%;
          background: #0a1628;
          border: 2px solid rgba(200,162,74,0.3);
          transition: all 0.5s;
        }

        .node-active .leg-node-dot {
          background: #c8a24a;
          border-color: #c8a24a;
          box-shadow: 0 0 20px rgba(200,162,74,0.6);
        }

        .leg-node-pulse {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 2px solid rgba(200,162,74,0.3);
          animation: nodePulse 2s ease-out infinite;
        }

        @keyframes nodePulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }

        /* ── Year Label ── */
        .leg-year-label {
          position: absolute;
          top: 30px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: rgba(255,255,255,0.15);
          transition: all 0.5s;
          z-index: 10;
        }

        .ms-left .leg-year-label {
          right: 24px;
        }

        .ms-right .leg-year-label {
          left: 24px;
        }

        .year-active {
          color: #c8a24a;
          text-shadow: 0 0 20px rgba(200,162,74,0.3);
        }

        /* ── Card Body ── */
        .leg-card-body {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: border-color 0.5s, box-shadow 0.5s;
          transform-style: preserve-3d;
          visibility: hidden; /* GSAP autoAlpha handles */
        }

        .leg-milestone:hover .leg-card-body {
          border-color: rgba(200,162,74,0.3);
          box-shadow:
            0 30px 80px rgba(0,0,0,0.5),
            0 0 40px rgba(200,162,74,0.05),
            inset 0 1px 0 rgba(255,255,255,0.05);
        }

        /* Hover glow */
        .leg-card-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            600px circle at var(--gx, 50%) var(--gy, 50%),
            rgba(200,162,74,0.08),
            transparent 40%
          );
          opacity: 0;
          transition: opacity 0.5s;
          pointer-events: none;
          z-index: 0;
        }

        .leg-milestone:hover .leg-card-glow {
          opacity: 1;
        }

        /* ── Image ── */
        .leg-card-img {
          position: relative;
          width: 100%;
          height: 240px;
          overflow: hidden;
        }

        .leg-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .leg-milestone:hover .leg-card-img img {
          transform: scale(1.08);
        }

        .leg-card-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            transparent 30%,
            rgba(4, 13, 26, 0.9) 100%
          );
          pointer-events: none;
        }

        .leg-card-year-bg {
          position: absolute;
          bottom: -12px;
          right: 16px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 90px;
          font-weight: 800;
          color: rgba(255,255,255,0.04);
          line-height: 1;
          pointer-events: none;
          letter-spacing: -0.03em;
        }

        /* ── Info ── */
        .leg-card-info {
          padding: 30px;
          position: relative;
          z-index: 1;
        }

        .leg-card-top-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 18px;
        }

        .leg-card-tag {
          font-family: monospace;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: #c8a24a;
          background: rgba(200,162,74,0.08);
          border: 1px solid rgba(200,162,74,0.18);
          padding: 6px 14px;
          border-radius: 6px;
        }

        .leg-metric {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .leg-metric-value {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: #c8a24a;
          line-height: 1;
          visibility: hidden; /* GSAP handles */
        }

        .leg-metric-label {
          font-family: monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.05em;
          margin-top: 4px;
        }

        .leg-card-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 26px;
          font-weight: 700;
          margin: 0 0 12px;
          color: #fff;
        }

        .leg-card-desc {
          font-size: 15px;
          color: rgba(255,255,255,0.55);
          line-height: 1.7;
          margin: 0;
        }

        /* ═══════════════════════════════════════
           MOBILE
           ═══════════════════════════════════════ */
        @media (max-width: 900px) {
          .leg-section {
            padding: 100px 16px 80px;
          }

          .leg-header {
            margin-bottom: 60px;
          }

          .leg-vline {
            left: 24px;
          }

          .leg-milestone,
          .leg-milestone.ms-left,
          .leg-milestone.ms-right {
            width: 100%;
            margin-left: 0;
            padding: 0 0 60px 56px;
          }

          .ms-left .leg-node,
          .ms-right .leg-node {
            left: 14px;
            right: auto;
          }

          .ms-left .leg-year-label,
          .ms-right .leg-year-label {
            left: 48px;
            right: auto;
          }

          .leg-card-img {
            height: 200px;
          }

          .leg-card-info {
            padding: 24px;
          }

          .leg-card-top-row {
            flex-direction: column;
            gap: 12px;
          }

          .leg-metric {
            align-items: flex-start;
          }

          .leg-card-title {
            font-size: 22px;
          }

          .leg-card-year-bg {
            font-size: 60px;
          }

          .leg-orb-1 {
            width: 300px;
            height: 300px;
          }

          .leg-orb-2 {
            width: 250px;
            height: 250px;
          }
        }
      `}</style>
    </section>
  );
}
